+++
date = "2021-08-17T05:00:00Z"
description = "I evaluate Codex, a large-scale language generation model intended to generate programming source code from OpenAI."
tags = ["ai", "openai"]
title = "How good is Codex?"
toc = 1
+++

{{< rawhtml >}}
    <style>
        .codex-run {
            color: #f8f8f2;
            background-color: #272822;
            margin-bottom: 1em;
        }
        .codex-run-meta {
            float: right;
            text-align: left;
            color: black;
            transform: translateX(calc(100% + 1em));
            font-size: 1rem;
        }
        .codex-run-meta code {
            font-size: 110%;
        }
        .codex-gen {
            color: #f8f8f2;
            background-color: #272822;
            white-space: pre-wrap;
            word-wrap: break-word;
            word-wrap: anywhere;
            display: block;
            padding: 0.75em;
        }
        .codex-gen-text {
            background-color: #005f5f;
        }
        .codex-input {
            background-color: #272822;
            font-weight: bold;
        }
        .bold-demo {
            font-weight: bold;
            font-family: monospace;
            font-size: 120%;
        }
        @media (max-width: 1180px) {
            .codex-run-meta {
                transform: unset;
                float: unset;
                color: #333;
            }
            .codex-run {
                color: inherit;
                background-color: inherit;
            }
            .codex-run-fact {
                display: inline;
            }
            .codex-run-fact::after {
                content: ", ";
            }
            .codex-run-fact:last-child::after {
                content: unset;
            }
        }
    </style>
{{< /rawhtml >}}

[OpenAI](https://openai.com/) recently released [Codex](https://openai.com/blog/openai-codex/) [(paper)](https://arxiv.org/pdf/2107.03374.pdf), a large-scale language generation model trained on public programming source code from [GitHub](https://github.com/). Its most prominent use so far is [GitHub Copilot](https://copilot.github.com/), which is an [extension](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot) for [VSCode](https://code.visualstudio.com/)[^code-oss] that autocompletes code being edited. However, there are many uses for Codex beyond code completion. OpenAI recently ran the [OpenAI Codex Challenge](https://challenge.openai.com/), where competitors were tasked with solving various programming tasks, and could use Codex to help them. I participated in the challenge and got [75th place](https://challenge.openai.com/codex/results/YXV0aDB8NjExMmIxZjcyNDU0ZjIwMDZhMjY4ZmY3)[^ranking]. Due to some overloaded servers during the challenge, many people were unable to actually do actually compete, so that ranking is mostly due to me figuring out the best times to reload to get the challenge to work. After the challenge, OpenAI sent me an invite to try out the Codex model, which I used to do the testing in the post.

[^code-oss]: It probably also works with open source builds (such as Code - OSS or VSCodium) too, although I am unable to verify this. Microsoft has released other proprietary plugins that [utilize DRM to ensure that they only run on offical builds](https://github.com/microsoft/vscode-remote-release/issues/967).

In this post, I find that Codex [understands the Linux source code](#context), can write simple scripts, can sometimes [write commit messages](#writing-commit-messages), can [write good explanations of code and provide good explanations of red-black trees](#explaining-code), can be [prompted to make the code it writes more secure](#writing-prompts) and more.

I've used a variety of languages in this post. OpenAI says that Codex has support for "JavaScript, Go, Perl, PHP, Ruby, Swift, TypeScript, SQL, and even Shell", and in my experience Codex does work quite well for all of those listed. I've also seen it write code in other languages, such as C, C++, and Rust fairly well. Codex's ability to write in a language is mostly based on how much training data it has seen in that language, so more obscure languages don't work as well. Some languages are also just easier for the model to work with: I find that in general, Codex works better with languages that make more things explict. Codex struggles to write code that passes Rust's borrow checker, since whether some code passes the borrow checker is a very complex function of the code (especially with [non-lexical lifetimes](https://rust-lang.github.io/rfcs/2094-nll.html)). It is comparatively easy to check if some code is syntactically valid, and so Codex very rarely writes code that is not syntactical.

[^ranking]: Oddly, that link says I got #75, but the leaderboard page says I got #79. I'm going with the higher number.

I will evaluate the strengths and weaknesses of Codex, determine what tasks it is well-suited for, and determine what the limits of what Codex can do. I will also explore many potential use-cases for Codex. While source code language models still have a long way to go, Codex is already very exciting, and I can't wait to see applications of it, and how the model itself can be improved.

Overall, I think that Codex's main strength currently is for writing simple pieces of code that don't require much understanding of any particular niche topic, or having a deep understanding of the codebase. Codex is able to write code that it has seen before in different ways and languages, and weave them together to  create to code. But it isn't yet able to write new algorithms, find clever optimizations, or consistently generate code without logic bugs. Hopefully over time better models will be developed that can exceed the ablities of Codex. There is still a long way to go in the development of source code language models, but Codex is already exicting today.

In this article, the input to the Codex model is {{< rawhtml >}}<span class="bold-demo">bold</span>{{< /rawhtml >}}, and the rest of the code is the output of the model. I also include the model parameters used to generate the output. Note that there is an element of randomness to the model's generations when the temperature is non-zero, so trying them yourself in those cases will give different results. Also note that in a few cases Codex generates the actual email addresses of other people, which I replaced with `[email removed]` to avoid spammers. Interestingly, the Copilot extension checks for email addresses and similar information in generated outputs, and discards generations that contain them. Here, the first two lines of this script were provided by me, and the third was generated by Codex.

{{< codex davinci-codex 0.4 1 0 0 >}}#!/bin/bash
# Say hello!</span>
echo "Hello, World!"{{< /codex >}}

## The model

There are actually two Codex models currently, davinci-codex and cushman-codex. The cushman-codex model is a smaller version of the davinci-codex model, which runs faster but at the cost of lower quality results. Despite this, cushman is actually quite competitive with davinci, and I have a hard time finding inputs where cushman did significantly worse than davinci. Often davinci-codex and cushman-codex do the same thing in different ways. GitHub Copilot seems to use a variant of cushman for cases where faster completions are desired (such as autocomplete), and an undocumented "earhart" model when slower completions are desired (such as when a user clicks a button to explictly request completions). Following the naming conventions of the current models where the first letter represents quality, earhart would provide results that are higher quality than davinci. Alas, I am unable to test this.

Various parameters can be used to control how the model generates it's output. Tuning these parameters can be quite helpful for getting the desired results. Since Codex is based on GPT-3, the parameters are the same as GPT-3.

### Temperature/top-P

The temperature is a value from 0-1 that controls how likely the model is to choose tokens that aren't the most likely ones. This is useful when you want the outputs to be more random or creative. While higher temperatures are often good for generating natural language text, they work less well for generating source code. This is because source code is more structured and "obvious" than natural language. Higher temperatures will result in outputs that attempt to perform the task in unexpected ways, but it it usually better to do things the obvious way than to devise some clever way to do that. In contrast, with natural language, stating things in uncommon ways is a good thing, since reframing already known things in new ways can help understanding.

Compare the outputs at the minimum temperature of 0, where it provides a short, working snippet:

{{< codex davinci-codex 0 1 0 0>}}#!/bin/bash
# Lists TSV files starting with "codex_"

</span>
for file in codex_*.tsv
do
    echo $file
done
{{< /codex >}}

...and the maximum temperature of 1, where the code is more complex and doesn't actually work:

{{< codex davinci-codex 1 1 0 0>}}#!/bin/bash
# Lists TSV files starting with "codex_"

</span>
while read filename
do
	if [ "$(echo "$filename" | grep -c "^codex_")" -eq 1 ];
	then
		echo $filename
	fi
done <<END
$(find exercises | sort)
END
{{< /codex >}}

This is [mentioned in the documentation](https://beta.openai.com/docs/guides/completion/working-with-code) for Codex as well:

> Setting the API temperature to 0, or close to zero (such as 0.1 or 0.2) tends to give better results in most cases. Unlike GPT-3, where a higher temperature can provide useful creative and random results, higher temperatures with Codex may give you really random or erratic responses.

You can also specify a top-P value from 0-1 to achieve similar results to changing the temperature. Changing Top-P values gives similar results to changing temperature values. The [API documentation](https://beta.openai.com/docs/api-reference/completions) says:

> We generally recommend altering this or `temperature` but not both.

Copilot dynamically chooses the number of times to sample the model (not sure how exactly), and uses a temperature between 0 and 0.8, with a higher temperature resulting when there are more samples.

### Frequency/presence penalty

The frequency and presence penalties can be used to force the model to behave in certain ways by discouraging the model from selecting certain tokens. Increasing the presence penalty discourages the model from producing tokens that it has already produced, and the frequency penalty discourages tokens based on how much they have already been in the text. This is useful for useful for stopping the model from getting into a repetition trap: often Codex will get stuck in a loop, repeating the same thing repeatedly. This isn't unique to Codex: GPT-3 can also get stuck repeating the same thing. For example, here it gets stuck repeating the last two #includes forever:
{{< codex davinci-codex 0 1 0 0 >}}// Kernel driver for USB keyboards.</span>
//
// Copyright (C) 2005-2006  Kevin O'Connor <[email removed]>
//
// This file may be distributed under the terms of the GNU LGPLv3 license.

#include "util.h" // dprintf
#include "irq.h" // irq_raise
#include "usb.h" // usb_keyboard_send
#include "usb-hid.h" // usb_hid_send
#include "usb-kbd.h" // usb_kbd_keycode
#include "usb-kbd-kbd.h" // usb_kbd_keycode
#include "usb-kbd-mouse.h" // usb_kbd_mouse_keycode
#include "usb-kbd-hid.h" // usb_kbd_hid_keycode
#include "usb-kbd-hid-mouse.h" // usb_kbd_hid_mouse_keycode
#include "usb-kbd-hid-keycode.h" // usb_kbd_hid_keycode
#include "usb-kbd-hid-mouse-keycode.h" // usb_kbd_hid_mouse_keycode
#include "usb-kbd-hid-keycode.h" // usb_kbd_hid_keycode
#include "usb-kbd-hid-mouse-keycode.h" // usb_kbd_hid_mouse_keycode
#include "usb-kbd-hid-keycode.h" // usb_kbd_hid_keycode
#include "usb-kbd-hid-mouse-keycode.h" // usb_kbd_hid_mouse_keycode
#include "usb-kbd-hid-keycode.h" // usb_kbd_hid_keycode
#include "usb-kbd-hid-mouse-keycode.h" // usb_kbd_hid_mouse_keycode
#include "usb-kbd-hid-keycode.h" // usb_kbd_hid_keycode
#include "usb-kbd-hid-mouse-keycode.h" // usb_kbd_hid_mouse_keycode
#include "usb-kbd-hid-keycode.h" // usb_kbd_hid_keycode
#include "usb-kbd-hid-mouse-keycode.h" // usb_kbd_hid_mouse_keycode
#include "usb-kbd-hid-keycode.h" // usb_kbd_hid_keycode
{{< /codex >}}

Increasing the frequency penalty fixes the issue:

{{< codex davinci-codex 0 1 0.2 0 >}}// Kernel driver for USB keyboards.</span>
//
// Copyright (C) 2005-2006  Kevin O'Connor <[email removed]>
//
// This file may be distributed under the terms of the GNU LGPLv3 license.

#include "util.h" // dprintf
#include "irq.h" // irq_raise
#include "usb.h" // usb_keyboard_send
#include "usb-hid.h" // usb_hid_send
#include "usb-kbd.h" // usb_kbd_keycode
#include "usb-descriptor.h" // usb_desc_keyboard_report
#include "usb-config.h" // usb_config_descriptor
#include "usb-device.h" // usb_device_send
#include "usb-endpoint.h" // usb_endpoint_xmit
#include "keyboard.h" // keyboard_keycode
#include "keymap.h" // keymap_keycode
#include "layout.h" // layout_keycode
#include "scancodes.h" // scancode_to_hidcode


// USB keyboard descriptor (from USB HID 1.11 spec, section 7.2.1).
static const uint8_t usb_kbd_descriptor[] = {
    0x05, 0x01,                    // USAGE_PAGE (Generic Desktop)
    0x09, 0x06,                    // USAGE (Keyboard)
    0xa1, 0x01,                    // COLLECTION (Application)

    0x85, 0x01,                    //   REPORT_ID (1)

    0x05, 0x07,                    //   USAGE_PAGE (Keyboard)

    0x19, 0xe0,                    //   USAGE_MINIMUM (Keyboard LeftControl)
    0x29, 0xe7,                    //   USAGE_MAXIMUM (Keyboard Right GUI)

    0x15, 0x00,                    //   LOGICAL_MINIMUM (0)
    0x25, 0x01,                    //   LOGICAL_MAXIMUM (1)

    0x75, 0x01,                    //   REPORT_SIZE (1)

    0x95, KEYBOARD_REPORTLEN - 1,  //   REPORT_COUNT (KEYBOARD_REPORTLEN - 1)

    0x81, 0x02,                    //   INPUT (Data,Var,Abs)

    0xc0                           // END COLLECTION
};
{{< /codex >}}

## Writing prompts

If Codex isn't giving the results you desire, you can often improve the result quality by designing a better prompt to push Codex towards the desired output. It often seems odd that you have to prompt Codex to write good code to make it do so, but consider that Codex was trained on a lot of low-quality code. As such, the output of the model reflects the fact that most code you can find on GitHub is not designed with security in mind. This happens most in languages that have a lot of insecure written in them, like PHP[^php]. Here, Codex generates PHP code that is vulnerable to SQL injection.

[^php]: That's not to say PHP is a bad language. It's not impossible to write secure PHP code, and knowing the basics of PHP security will get you a long way. PHP has done a lot to make the language more secure, but there is a lot of really insecure PHP code out there. PHP is disadvantaged by having much more historical baggage than newer languages.

{{< codex davinci-codex 0 1 0 0 >}}&lt;?php
$name = $_GET["name"];
# Insert $name into the people table</span>
$query = "INSERT INTO people (name) VALUES ('$name')";
$result = mysqli_query($db, $query);
if (!$result) {
    die("Database query failed.");
}
?&gt;
&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
&lt;title&gt;Insert Successful&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;p&gt;The new record in the people table is:&lt;/p&gt;
&lt;p&gt;Name: &lt;?php echo $name; ?&gt;&lt;/p&gt;
&lt;p&gt;&lt;a href="index.php"&gt;Back to the home page&lt;/a&gt;&lt;/p&gt;
&lt;/body&gt;
&lt;/html&gt;
{{< /codex >}}

With a bit of prompt engineering, we can fix the issue by asking Codex to do the insert "safely"[^safely]:
{{< codex davinci-codex 0 1 0 0 >}}&lt;?php
$name = $_GET["name"];
# Insert $name into the people table safely</span>
$sql = "INSERT INTO people (name) VALUES (:name)";
$stmt = $db-&gt;prepare($sql);
$stmt-&gt;bindParam(':name', $name);
$stmt-&gt;execute();
?&gt;
&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
&lt;title&gt;Inserting Data&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;h1&gt;Inserting Data&lt;/h1&gt;
&lt;p&gt;The name &lt;?php echo $name; ?&gt; has been inserted into the people table.&lt;/p&gt;
&lt;p&gt;Click &lt;a href="select.php"&gt;here&lt;/a&gt; to view the data in the table.&lt;/p&gt;
&lt;/body&gt;
&lt;/html&gt;
{{< /codex >}}

[^safely]: Although both versions still have a reflected XSS issue by `echo`ing the `$name` without escaping it. But this would only allow the user making the request to XSS themselves, without giving them complete database control. It's an improvement!


### Specifying the language

If all you give to Codex is a single comment, it is unable to guess what language to write the code in. You can usually just specify the language: instead of "Do the task", say "Do the task *in Rust*". If your language frequently has shebangs at the top of the file (like `#!/bin/bash` or `#!/usr/bin/env python3`) those also work well for specifying the language.

### Long-winded comments
Often Codex will write long-winded comments about what it is doing. While these are sometimes desirable, made-up information about the author and license is typically not desired.

{{< codex davinci-codex 0 1 0.2 0 >}}#!/bin/bash
# Script to find the total number words in Markdown files in the directory.</span>
#
# Usage:
#   ./count_words.sh [directory]
#
# If no directory is specified, the current directory is used.
#
# Author: Marko Mahnič
# Created: 2010-11-09 (as count_words.sh)
# Updated: 2010-11-09 (as count_words.sh)
# License: GPL (http://www.gnu.org/copyleft/gpl.html)

if [ $# -gt 0 ]; then
    DIR=$1; shift;
else
    DIR=`pwd`;
fi
echo "Counting words in files in $DIR"
find $DIR -name "*.md" -exec wc -w {} \; | awk '{sum += $1} END {print sum}'{{< /codex >}}

You can get around this by making sure Codex can't continue the header comment by adding empty lines after comments to stop Codex from being able to continue them.

{{< codex davinci-codex 0 1 0.2 0 >}}#!/bin/bash
# Script to find the total number words in Markdown files in the directory.


</span># Get the total number of words in all Markdown files in the directory.
#
# @param {string} $1 The directory to search.
# @return {int} The total number of words in all Markdown files in the directory.
function get_total_words() {
  local total_words=0

  for file in $(find $1 -name "*.md"); do
    local words=$(wc -w < $file)
    total_words=$((total_words + words))
  done

  echo $total_words
}


# Get the total number of words in all Markdown files in the directory.
#
# @param {string} $1 The directory to search.
# @return {int} The total number of words in all Markdown files in the directory.
function get_total_chars() {
  local total_chars=0

  for file in $(find $1 -name "*.md"); do
    local chars=$(wc -m < $file)
    total_chars=$((total_chars + chars))
  done

  echo $total_chars
}{{< /codex >}}

Codex actually generated [a longer script](/md-count-full.sh) that I cut off that is *really* bizarre, but at least it doesn't include a made-up author or license!

## Use cases
### Writing code
Codex is good at writing code, since that's what the main intent of it is. But how much complexity can Codex handle in the code it writes? Let's take a look at a few examples.

#### GitHub Copilot

I don't have access to GitHub Copilot, but anyone can download and install [the extension](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot). It just doesn't *work* without being able to authenticate with the backend. Taking a glance at the Copilot source code, it seems that it is doing a lot more than just sending the current line to the Codex model. Copilot actually tries to parse the code into an AST, and uses that information to help generate results. It seems it is using that to decide when to generate results, and when to stop the generation. This prevents issues with Codex auto-completing the current function, and then deciding to write more functions after that. This is probably why Copilot only supports a couple languages, while Codex can handle more: Copilot hasn't implemented parsing support for any other ones.

#### Context

Codex only supports up to 4096 tokens (where 1 token is around 4 characters of English) of combined context and output. As such, it doesn't work as well with large codebases, since it can't know about everything that it can do in a codebase.

This is actually somewhat mitigated for code that Codex was trained on (and especially for code that is popular enoguh that Codex has seen it multiple times), since in those cases Codex knows what the codebase looks like. When Codex is prompted to write code for Linux kernel, or kernel modules, it can write code that looks like other code in the kernel, and seems like actual kernel source code:

{{< codex davinci-codex 0 1 0.25 0.1 "(eventually gets into loop)" >}}// Linux kernel memory management utilites</span>
//
// Copyright (C) 2012  Kevin O'Connor <[email removed]>
//
// This file may be distributed under the terms of the GNU GPLv3 license.

#include "util.h" // dprintf
#include "mmu.h" // mmu_read_cr0, mmu_write_cr0, mmu_read_cr3, mmu_write_cr3
#include "vmm.h" // vmm_alloc, vmm_free, vmm_get_physaddr, vmm_get_page, vmm_get_page2
#include "paging.h" // paging_init, paging_map, paging_unmap
#include "multiboot.h" // multiboot_find, multiboot_getmemmap
#include "elf.h" // elf32_load
#include "elf64.h" // elf64_load
#include "elf32.h" // elf32_load
#include "elf64.h" // elf64_load
#include "x86emu/x86emu.h" // x86emu


// Initialize the MMU and set up the kernel page table.  This is called by the
// boot code once it has finished loading the kernel image and setting up the
// stack and heap.  It is also called by the kernel when it is running in a
// virtualized environment (such as QEMU).  The kernel page table is used to map
// physical addresses to virtual addresses for use by the kernel itself (e.g., to
// access its data structures).  The kernel page table is also used to map virtual
// addresses to physical addresses for use by the VMM (virtual memory manager).  In
// this case, the VMM will be using a different page table that maps virtual pages
// to physical pages for use by user processes.  The kernel page table is also used
// to map virtual addresses to physical addresses for use by the MMU (memory manager)
// when translating virtual addresses into physical addresses for use by user processes.
void mmu_init(void) {

    dprintf(1, "\nInitializing MMU...\n");

    // Initialize the MMU and set up the kernel page table:

    // Set up a temporary page directory that maps all pages to themselves:

    uintptr_t tempdir = vmm_alloc(1);
{{< /codex >}}

Note that most of the files it `#include`s actually have different names in the real kernel source code. But the comment it writes for `mmu_init` is very impressive: it's not a direct copy of some other comment in the kernel source code, but is actually better then similar *real* comments. For comparision, here's [an actual MMU initializer from the kernel source](https://github.com/torvalds/linux/blob/65c61de9d090edb8a3cfb3f45541e268eb2cdb13/arch/powerpc/mm/init_32.c#L110-L116):

```c
/*
 * MMU_init sets up the basic memory mappings for the kernel,
 * including both RAM and possibly some I/O regions,
 * and sets up the page tables and the MMU hardware ready to go.
 */
void __init MMU_init(void)
{
```

Codex produced what seems to be a *better* header comment! Codex's ability also raises some interesting copyright questions: does Codex know enough about the Linux kernel to be a derivative work of it? It certainly knows a lot about the structure and style of the kernel.

Codex is quite good at working with the Linux kernel. Here, I instructed Codex to write a driver. The generated code looks a lot like a real kernel driver. It delcares the right metadata, uses goto-style error handling, and overall looks like the sort of code you would see in the Linux kernel.

{{< codex davinci-codex 0 1 0 0 >}}/* Kernel driver for USB boot keyboard */</span>

#include &lt;linux/kernel.h&gt;
#include &lt;linux/errno.h&gt;
#include &lt;linux/init.h&gt;
#include &lt;linux/slab.h&gt;
#include &lt;linux/module.h&gt;
#include &lt;linux/kref.h&gt;
#include &lt;linux/usb.h&gt;
#include &lt;linux/input.h&gt;
#include &lt;linux/hid.h&gt;
#include &lt;linux/moduleparam.h&gt;

#define DRIVER_VERSION "v0.6"
#define DRIVER_AUTHOR "Arnaldo Carvalho de Melo &lt;[email removed]&gt;"
#define DRIVER_DESC "USB boot keyboard driver"

static int debug;
module_param(debug, bool, 0644);
MODULE_PARM_DESC(debug, "Debug enabled or not");

#define USB_VENDOR_ID_LOGITECH		0x046d
#define USB_DEVICE_ID_LOGITECH_UNIFYING_RECEIVER	0xc52b
#define USB_DEVICE_ID_LOGITECH_UNIFYING_RECEIVER_2	0xc52f

struct usb_boot_kbd {
	struct kref kref;
	struct usb_device *usbdev;
	struct input_dev *input;
	char name[128];
};

static void usb_boot_kbd_delete(struct kref *kref)
{
	struct usb_boot_kbd *boot_kbd = container_of(kref, struct usb_boot_kbd, kref);

	usb_put_dev(boot_kbd-&gt;usbdev);
	input_unregister_device(boot_kbd-&gt;input);
	kfree(boot_kbd);
}

static void usb_boot_kbd_disconnect(struct usb_interface *intf)
{
	struct usb_boot_kbd *boot_kbd;
	struct input_dev *input;

	boot_kbd = usb_get_intfdata(intf);
	usb_set_intfdata(intf, NULL);
	if (!boot_kbd)
		return;

	input = boot_kbd-&gt;input;
	boot_kbd-&gt;usbdev-&gt;bus-&gt;needs_remote_wakeup = 0;
	usb_kill_urb(boot_kbd-&gt;usbdev-&gt;urb);
	usb_boot_kbd_delete(&boot_kbd-&gt;kref);
	input_unregister_device(input);
}

static int usb_boot_kbd_probe(struct usb_interface *intf,
			      const struct usb_device_id *id)
{
	struct usb_device *dev = interface_to_usbdev(intf);
	struct usb_boot_kbd *boot_kbd;
	struct input_dev *input_dev;
	int error;

	if (dev-&gt;descriptor.bDeviceClass != USB_CLASS_HID ||
	    dev-&gt;descriptor.bDeviceProtocol != 0 ||
	    le16_to_cpu(dev-&gt;descriptor.idVendor) != USB_VENDOR_ID_LOGITECH ||
	    (le16_to_cpu(dev-&gt;descriptor.idProduct) !=
	     USB_DEVICE_ID_LOGITECH_UNIFYING_RECEIVER &&
	     le16_to_cpu(dev-&gt;descriptor.idProduct) !=
	     USB_DEVICE_ID_LOGITECH_UNIFYING_RECEIVER_2))
		return -ENODEV;

	boot_kbd = kzalloc(sizeof(struct usb_boot_kbd), GFP_KERNEL);
	input_dev = input_allocate_device();
	if (!boot_kbd || !input_dev) {
		error = -ENOMEM;
		goto fail1;
	}

	kref_init(&boot_kbd-&gt;kref);
	boot_kbd-&gt;usbdev = dev;
	boot_kbd-&gt;input = input_dev;
	snprintf(boot_kbd-&gt;name, sizeof(boot_kbd-&gt;name),
		 "Logitech Unifying Receiver %04x:%04x",
		 le16_to_cpu(dev-&gt;descriptor.idVendor),
		 le16_to_cpu(dev-&gt;descriptor.idProduct));

	usb_make_path(dev, boot_kbd-&gt;name, sizeof(boot_kbd-&gt;name));
	strlcat(boot_kbd-&gt;name, ":input0", sizeof(boot_kbd-&gt;name));

	input_dev-&gt;name = boot_kbd-&gt;name;
	input_dev-&gt;phys = boot_kbd-&gt;name;
	usb_to_input_id(dev, &input_dev-&gt;id);
	input_dev-&gt;dev.parent = &intf-&gt;dev;

	input_dev-&gt;evbit[0] = BIT_MASK(EV_KEY) | BIT_MASK(EV_LED) |
		BIT_MASK(EV_REP);
	input_dev-&gt;ledbit[0] = BIT_MASK(LED_NUML) | BIT_MASK(LED_CAPSL) |
		BIT_MASK(LED_SCROLLL) | BIT_MASK(LED_COMPOSE) |
		BIT_MASK(LED_KANA);
	input_dev-&gt;keycode = boot_kbd-&gt;name;
	input_dev-&gt;keycodesize = sizeof(unsigned char);
	input_dev-&gt;keycodemax = ARRAY_SIZE(boot_kbd-&gt;name);

	usb_fill_int_urb(dev-&gt;urb, dev,
			 usb_rcvintpipe(dev, dev-&gt;actconfig-&gt;desc.bEndpointAddress),
			 dev-&gt;urb-&gt;transfer_buffer, 8,
			 usb_boot_kbd_irq, boot_kbd,
			 dev-&gt;actconfig-&gt;desc.bInterval);
	dev-&gt;urb-&gt;transfer_flags |= URB_NO_TRANSFER_DMA_MAP;

	error = input_register_device(boot_kbd-&gt;input);
	if (error)
		goto fail2;

	usb_set_intfdata(intf, boot_kbd);
	return 0;

fail2:
	kref_put(&boot_kbd-&gt;kref, usb_boot_kbd_delete);
fail1:
	input_free_device(input_dev);
	kfree(boot_kbd);
	return error;
}

static struct usb_driver usb_boot_kbd_driver = {
	.name =		"usb_boot_kbd",
	.probe =	usb_boot_kbd_probe,
	.disconnect =	usb_boot_kbd_disconnect,
	.id_table =	usb_boot_kbd_ids,
};

static int __init usb_boot_kbd_init(void)
{
	int retval;

	retval = usb_register(&usb_boot_kbd_driver);
	if (retval)
		printk(KERN_ERR "Unable to register USB boot keyboard driver\n");

	return retval;
}

static void __exit usb_boot_kbd_exit(void)
{
	usb_deregister(&usb_boot_kbd_driver);
}

module_init(usb_boot_kbd_init);
module_exit(usb_boot_kbd_exit);

MODULE_AUTHOR(DRIVER_AUTHOR);
MODULE_DESCRIPTION(DRIVER_DESC);
MODULE_LICENSE("GPL");
MODULE_DEVICE_TABLE(usb, usb_boot_kbd_ids);{{< /codex >}}

#### Single-file scripts

Codex works best for generating single-file scripts. Here is an example I find impressive: I gave Codex a vague prompt, and it filled in the blanks. It's not *quite* right, since it doesn't authenticate the request to the Gmail API, but adding proper authentication could be done quite easily (HTTP Basic Auth is supported). 

{{< codex davinci-codex 0 1 0 0 >}}#!/usr/bin/env node
// Checks if too many emails are unread</span>

var fs = require('fs');
var request = require('request');
var config = require('./config.json');

var options = {
  url: 'https://mail.google.com/mail/feed/atom',
  headers: {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_3)↵
    AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.47 Safari/537.36'
  }
};

request(options, function(error, response, body) {
  if (!error && response.statusCode == 200) {
    var feed = new (require('feedparser'))(body);
    var unread = feed.entries.filter(function(entry) {
      return entry.title.indexOf('unread') > -1;
    }).length;

    if (unread > config.maxUnread) {
      var message = 'You have ' + unread + ' unread emails!';
      var options = {
        host: 'api.pushover.net',
        port: 443,
        path: '/1/messages.json',
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Length': message.length
        }
      };

      var req = https.request(options, function(res) {
        res.on('data', function(d) {
          console.log(d);
        });
      });

      req.on('error', function(e) {
        console.log(e);
      });

      req.write(querystring.stringify({
        token: config.pushoverToken,
        user: config.pushoverUser,
        message: message
      }));

      req.end();
    }
  }
});
{{< /codex >}}

#### Subtle errors

Often Codex will write code that looks right at first glance, but actually has subtle errors. Try to spot the error:

{{< codex davinci-codex 0 1 0 0 >}}#!/bin/bash
# Count the number of files in the current directory, and append the count to↵
~/count.tsv</span>

ls -1 | wc -l > ~/count.tsv
{{< /codex >}}

In that snippet, it overwrites the existing contents of `~/count.tsv` by using `>` instead of appending with `>>`. Changing the prompt even slightly fixes it:

{{< codex davinci-codex 0 1 0 0 >}}#!/bin/bash
# Count the # of files in the current directory, append that to ~/count.tsv</span>

# Count the number of files in the current directory
num_files=$(ls -1 | wc -l)

# Append the count to ~/count.tsv
echo "$num_files" >> ~/count.tsv{{< /codex >}}

Another one: here, Codex generates the *n*th prime, not the the *n*th *mersenne* prime.

{{< codex davinci-codex 0 1 0 0 >}}// Finds the nth mersenne prime
fn nth_mersenne</span>_prime(n: usize) -> u64 {
    let mut primes = vec![2];
    let mut i = 3;
    while primes.len() < n {
        if is_prime(i) {
            primes.push(i);
        }
        i += 2;
    }

    primes[n - 1]
}{{< /codex >}}

### Writing commit messages
We can try feeding Codex a diff and asking it for a commit message. Codex often struggles here due to lacking enough context. I picked [a commit](https://github.com/rust-lang/rust/commit/4dd933cdc244e9aed766553909a5ebf7572baec1) with a commit message that is fairly clear from the diff, "Deprecate llvm_asm!" Can Codex write a commit message?
{{< codex davinci-codex 0 1 0 0 >}}diff --git a/library/core/src/macros/mod.rs b/library/core/src/macros/mod.rs
index 87fdbf2dca392..476f37699ee73 100644
--- a/library/core/src/macros/mod.rs
+++ b/library/core/src/macros/mod.rs
@@ -1347,6 +1347,10 @@ pub(crate) mod builtin {
         issue = "70173",
         reason = "prefer using the new asm! syntax instead"
     )]
+    #[rustc_deprecated(
+        since = "1.56",
+        reason = "will be removed from the compiler, use asm! instead"
+    )]
     #[rustc_builtin_macro]
     #[macro_export]
     macro_rules! llvm_asm {
---
Commit message:</span> "rustfmt: fix rustfmt_skip attribute"
{{< /codex >}}

The commit message *looks* like the sort of one you would see in `rustc`, but it doesn't make sense here. `rustfmt` is unchanged by the provided diff. I've tried writing a better prompt to get Codex to write better commit messages, but I haven't found a prompt that can convince Codex to consistently write good commit messages. Adding example messages for other commits can sometimes give better results, but sometimes Codex will just regurgitate one of the commit messages it saw before. Asking for an explanation of the commit, instead of asking for a commit message directly, sometimes gives interesting results.

{{< codex davinci-codex 0 1 0.2 0 >}}diff --git a/library/core/src/macros/mod.rs b/library/core/src/macros/mod.rs
index 87fdbf2dca392..476f37699ee73 100644
--- a/library/core/src/macros/mod.rs
+++ b/library/core/src/macros/mod.rs
@@ -1347,6 +1347,10 @@ pub(crate) mod builtin {
         issue = "70173",
         reason = "prefer using the new asm! syntax instead"
     )]
+    #[rustc_deprecated(
+        since = "1.56",
+        reason = "will be removed from the compiler, use asm! instead"
+    )]
     #[rustc_builtin_macro]
     #[macro_export]
     macro_rules! llvm_asm {
---
Here is how I explained the effect of this commit:</span>

&gt; The `llvm_asm!` macro was deprecated in 1.56.0 because it was not used
&gt; anywhere in the codebase.
&gt;
&gt; The `asm!` macro is a more general macro that allows for inline assembly
&gt; with more features than the `llvm_asm!` macro.
&gt;
&gt; The `llvm_asm!` macro will be removed in 1.58.0, and the `asm!` macro will
&gt; remain as a more general macro for inline assembly.
---
The commit message is:

```text
[1.56.0] Deprecate llvm_asm! in favor of asm! (#70173)
```
---
{{< /codex >}}

This is quite impressive: it managed to extract a link to a relevent GitHub issue from the context lines, add wrote a good explanation. The commit message it wrote after the explanation was quite good as well.

### Writing diffs

Let's try that in reverse: generating a diff, given a commit message.

{{< codex davinci-codex 0 1 0 0 >}}Date: Thu, 29 Jul 2021 16:51:32 +0200
Subject: [PATCH] Deprecate llvm_asm!

---</span>
 src/libcore/macros.rs | 3 +++
 1 file changed, 3 insertions(+)

diff --git a/src/libcore/macros.rs b/src/libcore/macros.rs
index fc7a8b5..c9d8d2f 100644
--- a/src/libcore/macros.rs
+++ b/src/libcore/macros.rs
@@ -13,7 +13,7 @@ pub mod asm;
 pub mod mem;
 pub mod ptr;
 pub mod raw;
-pub mod simd;
+#[macro_use] pub mod simd;
 pub mod str;
 pub mod sync;
 pub mod time;
--
2.21.0
{{< /codex >}}

That is a correctly formatted diff, but for a file that doesn't exist. I didn't expect Codex to do well here, since it doesn't know what the file it needs to modify currently looks like. Let's see if giving it some context will help. This is making it easy for Codex, since I've removed all the other lines in the file. All Codex needs to do is figure out what lines to add:

{{< codex davinci-codex 0 1 0 0 >}}library/core/src/macros/mod.rs:
    /// LLVM-style inline assembly.
    ///
    /// Read the [unstable book] for the usage.
    ///
    /// [unstable book]: ../unstable-book/library-features/llvm-asm.html
    #[unstable(
        feature = "llvm_asm",
        issue = "70173",
        reason = "prefer using the new asm! syntax instead"
    )]
    #[rustc_builtin_macro]
    #[macro_export]
    macro_rules! llvm_asm {
        ("assembly template"
                        : $("output"(operand),)*
                        : $("input"(operand),)*
                        : $("clobbers",)*
                        : $("options",)*) => {
            /* compiler built-in */
        };
    }

Date: Thu, 29 Jul 2021 16:51:32 +0200
Subject: [PATCH] Deprecate llvm_asm!

---</span>
 src/macros/mod.rs | 1 +
 1 file changed, 1 insertion(+)

diff --git a/src/macros/mod.rs b/src/macros/mod.rs
index ee9e8c9..f9d8f8e 100644
--- a/src/macros/mod.rs
+++ b/src/macros/mod.rs
@@ -1,3 +1,4 @@
+//! This module contains the `llvm_asm!` macro.
 
 /// The `llvm_asm!` macro provides a #[unstable(feature = "llvm_asm", issue = "70173")]
 /// way to use inline assembly.
@@ -6,7 +7,6 @@
 ///
 /// ## Example
 ///
-/// ```
-/// #[macro_use]
-/// extern crate llvm_asm;
-///
 /// llvm_asm!("mov $1, $2"
 ///         : "=r"(a), "=r"(b)
 ///         : "r"(c), "r"(d)
--
2.22.1
{{< /codex >}}

That doesn't do it either. Perhaps there is some good way to prompt Codex into writing diffs, but I haven't found any good way to tell Codex to make a change to some existing code.

### Explaining code

Another interesting use-case for Codex is getting it to explain code in natural language. I had to go through many iterations of the prompt in order to get the type of explanations I liked: by changing the prompt can, you change the type of results you get. Replacing "software developer" with "second grader" makes the explanations simpler. The "at a high level" part helps discourage the model from just doing a line-by-line explanation. I also find that increasing the temperature is beneficial here, since explanations are less structured than source code.

{{< codex davinci-codex 0.7 1 0 0.11 >}}export function isLeapYear(date: Date) {
    var year = date.getFullYear();
    if ((year & 3) != 0) return false;
    return ((year % 100) != 0 || (year % 400) == 0);
}
'''
Here's how I explained that code to a software developer at a high level:</span>

I have a function called isLeapYear that takes a date and returns a boolean.

The date argument is the year to check.

The code checks whether the year is divisible by four (modulo).  If it's
not, then it's not a leap year.

Otherwise, it checks if the year is divisible by 100 (modulo).

If it is, then we want to see if it's also divisible by 400.  If the
year is not divisible by 100, then we don't need to check 400.

We can use the modulo operator to divide by things like 2 and get the
remainder (2 goes into the year number 50 two times, with 10 leftover).

We can also use the modulo operator to divide by things like 4 and see
if the remainder is 0.  If it's zero, then the year number is evenly
divisible by 4.  If it's not, then it's not.

The modulo operator is useful for seeing if a number is evenly divisible
by another number, or for finding the remainder when dividing.

I hope this helps!
{{< /codex >}}

{{< codex davinci-codex 0.7 1 0 0.11 >}}export function getDOY(date: Date) {
    var dayCount = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
    var mn = date.getMonth();
    var dn = date.getDate();
    var dayOfYear = dayCount[mn] + dn;
    if (mn > 1 && isLeapYear(date)) dayOfYear++;
    return dayOfYear;
}
'''
Here's how I explained that code to a software developer:</span>

"This is a function that takes a date object and returns the day of the year.

The day of the year is the number of days that have passed since January 1st.

If the month is after February, then we add one to the day of the year because
February 29th is counted twice.

The day of the year is the sum of the days in the months before the current month,
plus the current day.

The day of the year is a number between 1 and 365.

If the year is a leap year, then we add one to the day of the year because February 29th
is counted twice."

I'm not sure if this is the best explanation, but it's the clearest I could find.
{{< /codex >}}

Let's try something harder: [a data data structure function from the Linux kernel](https://github.com/torvalds/linux/blob/a2824f19e6065a0d3735acd9fe7155b104e7edf5/kernel/sched/topology.c#L584-L602). This explanation is very impressive: the code doesn't even explictly mention that it is a red-black tree. The only clue is the `rb` in the function name, and the contents of the function. Despite this, Codex delivers an explanation of red-black trees. Note that the `__rb_insert_color` function is totally made up by Codex: it doesn't actually exist in the kernel source code. But Codex explains it anyways!

{{< codex davinci-codex 0.7 1 0 0.11 >}}static inline void
__rb_rotate_set_parents(struct rb_node *old, struct rb_node *new,
			struct rb_root *root, int color)
{
	struct rb_node *parent = rb_parent(old);
	new->__rb_parent_color = old->__rb_parent_color;
	rb_set_parent_color(old, new, color);
	__rb_change_child(old, new, parent, root);
}
'''
Here's how I explained that code to a software developer:</span>

The function takes the node that is going to be rotated from its parent, the
node that is going to take the place of the old node, the root node, and a
boolean value indicating whether or not the new node is red.

The first thing it does is find the parent of the old node.

It then sets the parent pointer of the new node to the old node's parent.

It then sets the new node's color to the old node's color.

It finally changes the child pointer of the old node's parent to point to the
new node.

After this function completes, the old node is no longer a child of its parent,
and it has been "rotated" into the new node's position.

Now that we know how __rb_rotate_set_parents() works, we can look at
__rb_insert_color() which implements both the 2-3 and the 2-3-4 tree insertion
algorithms.

```
static __always_inline void
__rb_insert_color(struct rb_node *node, struct rb_root *root)
{
	struct rb_node *parent, *gparent;

	while ((parent = rb_parent(node)) && rb_is_red(parent)) {
		gparent = rb_parent(parent);
		if (parent == gparent->rb_left) {
			{
				__rb_rotate_set_parents(parent, node, root,
							RB_BLACK);
				parent = node;
			}
			{
				__rb_rotate_set_parents(gparent, parent, root,
							RB_RED);
			}
		} else {
			{
				__rb_rotate_set_parents(parent, node, root,
							RB_BLACK);
				parent = node;
			}
			{
				__rb_rotate_set_parents(gparent, parent, root,
							RB_RED);
			}
		}
	}

	rb_set_parent_color(node, NULL, RB_BLACK);
}
```

This function is responsible for making the new node that was passed in black
and setting the parent of the new node to be NULL.

Next it checks to see if the parent of the new node is red.

If it is, then we need to rebalance the tree.

We start by finding the grandparent of the new node.

If the new node is the left child of its parent, then we rotate right around
the parent.

Specifically, we swap the colors of the parent and the grandparent, change the
parent pointer of the new node to the grandparent, and then change the child
pointer of the grandparent to point to the new node.

If the new node is the right child of its parent, then we rotate left around
the parent.

Again, we swap the colors of the parent and the grandparent, change the parent
pointer of the new node to the grandparent, and then change the child pointer
of the grandparent to point to the new node.

After this is done, we need to check whether or not the grandparent is red.

If it is, then we've created a 4-node. In this case, we need to recolor and
rebalance the tree.

If the grandparent is black, then we're all done.

If you've been following along, then you'll notice that __rb_insert_color()
basically implements the same rebalancing procedure every time.

This is because the __rb_insert_color() function is called any time a new
node is added to the tree, and that includes when the root is added.

So, how do we know when the root is added?

We can look at the code:

```
static void rb_insert_color(struct rb_node *node, struct rb_root *root)
{
	struct rb_node *parent = NULL;

	while (node->__rb_parent_color) {
		parent = rb_parent(node);
		if (!parent)
			goto out;

		if (parent->rb_left == node) {
			if (__rb_is_black(parent))
				goto out;
			__rb_rotate_right(parent, root);
		} else {
			if (__rb_is_black(parent))
				goto out;
			__rb_rotate_left(parent, root);
		}
	}

	rb_erase_augmented(node, root);
	node->__rb_parent_color = RB_BLACK;
out:
	;
}
```

The code checks the parent of the node, and if the node has a parent then it
checks if the parent is black.

If it is, then we're done.

If the node's parent is red, then we need to rebalance the tree.

If the node is the left child of its parent, then we rotate right around the
parent.

If the node is the right child of its parent, then we rotate left around the
parent.

If the node has no parent, then we've reached the root, and we're done.

If you've been following along, then you'll notice that the __rb_insert_color()
function basically implements the same rebalancing procedure every time.

This is because the __rb_insert_color() function is called any time a new
node is added to the tree, and that includes when the root is added.

And that's how we insert into a red-black tree.

I hope you've enjoyed this journey through the implementation details of the
red-black tree.

I'm sure there's plenty more to learn about the implementation of the red-black
tree, but I'm not going to discuss anything else right now.

To recap, here's a list of all the different rebalancing procedures that are
used to maintain balance in the red-black tree:

1. __rb_rotate_left()
2. __rb_rotate_right()
3. __rb_insert_color()
4. __rb_erase()
5. __rb_erase_augmented()

There's a lot of code in rb.c just for rebalancing the red-black tree, but this
is the gist of how it works.

I hope you've enjoyed this journey through the implementation details of the
red-black tree.

So that's it for this video.

Thank you for watching.

I'll see you in the next video.{{< /codex >}}

## Weaknesses
### Stopping

Codex will often generate more than the desired code. Codex will often generate a function from a comment, and then start generate whatever functions it thinks should be written next. The easiest way to work around this is to stop generating tokens once you see something like `}` at the same indentation level as the prompt. You could also be more advanced and parse the Codex outputs to stop when there is a full AST for a function, as Copilot seems to do. In this blog post, I have manually decided where to cut off outputs.

### Dependencies
Codex will often reference other code that don't actually exist. Here, it references a `is_prime` function without actually writing it.
{{< codex davinci-codex 0 1 0 0 >}}/// Finds the nth prime.
fn nth_prime(n:</span> usize) -> usize {
    let mut primes = vec![2];
    let mut i = 3;
    while primes.len() &lt; n {
        if is_prime(i, &primes) {
            primes.push(i);
        }
        i += 2;
    }
    primes[n - 1]
}{{< /codex >}}

Most of the time we can fix this by just prompting Codex with the start of the missing function declaration:

{{< codex davinci-codex 0 1 0 0 >}}/// Finds the nth prime.
fn nth_prime(n: usize) -> usize {
    let mut primes = vec![2];
    let mut i = 3;
    while primes.len() &lt; n {
        if is_prime(i, &primes) {
            primes.push(i);
        }
        i += 2;
    }
    primes[n - 1]
}

fn is_prime</span>(n: usize, primes: &Vec&lt;usize&gt;) -> bool {
    for p in primes {
        if n % p == 0 {
            return false;
        }
    }
    true
}
{{< /codex >}}

Now the code works.

### Switching languages

Sometimes Codex will suddenly go: "Suprise! That was actually just part of a string in a different language". I find this happens most with languages that are often embedded, like LaTeX and HTML.

{{< codex davinci-codex 0 1 0 0 >}}\documentclass[]{article}
\usepackage{amsmath,amsthm,amssymb}
\newtheorem{thm}{Theorem}

%opening
\title{Proof</span> of Theorem}
\author{}
\date{}
\begin{document}
\maketitle

%body
\begin{abstract}
\end{abstract}

\section{Theorem}

\begin{proof}
\end{proof}

\end{document}
"""

def main():
    if len(sys.argv) &lt; 2:
        print("Usage: python3 proof.py <theorem>")
        sys.exit(1)
    theorem = sys.argv[1]
    with open("theorem.tex", "w") as f:
        f.write(template.replace("Theorem", theorem))
    os.system("pdflatex theorem.tex")
    os.system("rm theorem.aux theorem.log")

if __name__ == "__main__":
    main()
{{< /codex >}}

You can work around this by stopping at the right point: for LaTeX, when you see `\end{document}` just stop requesting tokens. Some prompt engineering indicating that it's just a single file might also help.

### Inability to backtrack
There's no easy way to tell Codex to generate in the middle of some text. You either need to get it to generate at the end, or otherwise convey the text after the generation.

{{< codex davinci-codex 0 1 0 0 >}}In the code:
```
function d(a, b) {
    ???
}
console.assert(d(10, 20) === 200);
```
??? is: `</span>return a * b;`{{< /codex >}}

That demo was cherry-picked for a good result. Most of the tests I tried didn't work out well. Most of the time Codex isn't able to figure that sort of problem out. Here is a fairly typical result, where Codex gives an answer that doesn't make any sense (`a` and `b` aren't defined here).

{{< codex davinci-codex 0 1 0 0 >}}In the code:
```
function d() {
    ???
}
console.assert(d() === 8);
```
??? is: `</span>return a + b;`{{< /codex >}}

Perhaps there is some better way to prompt Codex to generate code in the middle of other code, but I haven't found any.

## Conclusion

(edit: see the introduction at the top for what you are looking for if you just jumped to the conclusion)

That's it! I had a fun time exploring what Codex can do, and I can't wait to see what will happen next in the code generation space!.
