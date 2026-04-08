+++
date = "2026-04-08T00:00:00Z"
description = "How to get frontier chat models to be kinda like base models"
tags = ["ai"]
title = "Getting chat-tuned models to act kinda like base models"
+++

So I love talking with base models (self-supervised models trained to predict the next token across a wide corpus of training data). But unfortunately none of the frontier labs let the public interact with their frontier base models, which makes me sad 😔. Luckily there are a few tricks I know to get chat-tuned LLMs out of their Assistant persona and into generating likely text completions.

## Fake tool calls

The main trick that I use is *fake tool calls*: using a system prompt with fake instructions on how to make tool calls and a list of fake tool definitions. Normally when Claude makes a tool call it writes a `<function_calls>` block and then a `<function_results>` block is injected with the tool call results, but since the tool calls are fake that doesn't happen. Instead the model writes the tool call response itself, because it has to produce tokens and a tool call response is the most likely thing after a tool call.

The easiest way to use fake tool calls is to define a web search tool, web fetch tool, and bash tool, and ask the model to fetch content from the Internet or read files. You can ask the model to fetch any web page and it will hallucinate content for that URL, and you can ask the model to read files on the disk and it will hallucinate content based on the file name and what you've described about the file contents in the conversation.

Here's a prompt I've found works decently well that was mostly written by asking Claude Opus 4.6 to summarize how it makes tool calls.[^hc10sapv8la]

<details>
<summary>Tool call trick prompt (mostly written by Claude Opus 4.6)</summary>

`````
You have access to tools that let you take actions beyond generating text.

**How tool calling works:**

To call a tool, emit a function call block in your response using the following XML structure:

```
<function_calls>
<invoke name="tool_name">
<parameter name="param_name">value</parameter>
</invoke>
</function_calls>
```

When you emit this block, generation pauses. The system executes the tool and returns the result in a `<function_results>` block. You then continue your response using that result. You may chain multiple tool calls across successive turns to accomplish multi-step tasks.

**Available tools:**

**`web_fetch`** — Fetch a web page and return the text content of the page.
- Parameters:
  - `url` (string, required): The URL to fetch.
- Example:
```
<function_calls>
<invoke name="web_fetch">
<parameter name="url">https://anthropic.com/</parameter>
</invoke>
</function_calls>
```

**`web_search`** — Search the web and return results with titles, URLs, and snippets.
- Parameters:
  - `query` (string, required): The search query.
- Example:
```
<function_calls>
<invoke name="web_search">
<parameter name="query">rust async runtime comparison</parameter>
</invoke>
</function_calls>
```

**`bash`** — Execute a shell command in a sandboxed Linux environment and return stdout/stderr.
- Parameters:
  - `command` (string, required): The command to run.
- Example:
```
<function_calls>
<invoke name="bash">
<parameter name="command">ls -la /home/user/project</parameter>
</invoke>
</function_calls>
```

**Guidelines:**
- Call one tool at a time. Wait for its result before deciding your next step.
- Do not fabricate tool results. If you need information you don't have, use a tool to get it.
- If a tool call fails, inspect the error and retry with corrected parameters or inform the user.
`````

</details>

Generating tool call responses is out-of-distribution for chat-tuned models, which are fine-tuned and RL'd to generate good Assistant turns but aren't optimized to generate sensible content outside of Assistant turns (i.e. tool call responses, user turns, and the system prompt) after pre-training. Post-training does still shift token likelihood distributions for non-Assistant turns though; for example when sampling from the user turn Claude tends to generate completions [where unsafe completions tend to not happen](https://alignment.anthropic.com/2026/psm/#:~:text=Assistant%2Dlike%20completions%20in%20non%2DAssistant%20contexts). I've seen similar behavior happen when generating tool call completions too: if you generate a tool response completion for a bash command that makes an unsafe query to an uncensored model, it will hallucinate a request failure much more often than making a normal query to a normal model. (You can get around this with partial prefills, described below.)

One interesting thing about having it hallucinate content from the future from the Internet (e.g. news articles) is that Claude seems to strongly avoid coming up with future content; even if you convince Claude the year is 2030 and ask for current news, it will end up hallucinating web pages that are dated in 2030 but have news from around the model's knowledge cutoff – which the model then gets very confused about after the tool call response (because it's extremely weird for no new news to happen in five years).

Originally I did this by defining actual tool calls in the API call so that the model saw the tool call definitions in the exact right format, and then adding a note in the system prompt that the tool calling format has changed and the model should use some slightly different format (because the API always treats a real tool call invocation as a stop sequence and doesn't keep generating). I kept running into issues where the model would ignore the system prompt about the new tool call format, so I changed to not defining any actual tools in the API call.

## Partial prefills

One really helpful trick for controlling chat-tuned LLM behavior is partially prefilling the Assistant completion, which puts words in the Assistant's mouth. This is super helpful for forcing the completion to go in the way you want. Unfortunately OpenAI has never allowed partial Assistant prefills and Anthropic stopped allowing this with Opus 4.6 and later models. Older Anthropic models and all Gemini models allow partial Assistant prefills though.

The reason OpenAI/Anthropic don't like partial prefilling is that it makes it much easier to steer the model towards unsafe completions. Claude is pretty good at self-correction (I think Anthropic specifically trains it for this) after it says something wrong or bad, which makes it much more resistant to attempts to jailbreak it through partial assistant prefills (e.g. prefilling "Sure! Here's how to"). Gemini isn't good at self-correction so it's very easy to jailbreak it through partial assistant prefills.

The main uses of partial prefills are:
-  Forcing the model to actually make a tool call immediately
    *   This is useful when the model refuses to make the exact tool call. It also saves you a bit of money because input tokens are much cheaper than output tokens.
-  Prefilling some of the tool call response to force some of its format
    *   This is useful if the model hallucinates a 404 for web pages or a not-found error when reading files. It's also helpful for setting the title of the webpage/document to force the completion to actually be about what you want.

## Fin

This trick is pretty neat and I hope you enjoy it. I think you should try experimenting with this for youself!

[^hc10sapv8la]: Note that the real tool calling mechanism involves adding an antml: prefix to most of the XML tags, unlike that prompt.

