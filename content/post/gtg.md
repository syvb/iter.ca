+++
date = "2022-01-17T00:00:00Z"
description = "How I keep track of what things to do"
tags = ["productivity"]
title = "My to-do list system"
draft = true
+++

I've tried and failed to use many productivity systems. Usually the process goes something like this:

<!--
digraph "Productivity" {
    "Find new productivity system" -> "Enjoy novelty of new system"
    "Enjoy novelty of new system" -> "Use new productivity system a lot"
    "Use new productivity system a lot" -> "My life feels pretty organized"
    "My life feels pretty organized" -> "Novelty wears off"
    "Novelty wears off" -> "Get bored of productivity system"
    "Get bored of productivity system" -> "Stop using productivity system"
    "Stop using productivity system" -> "Find new productivity system"
}
-->
![Cyclic graph: "Find new productivity system" to "Enjoy novelty of new system" to "Use new productivity system a lot" to "My life feels pretty organized" to "Novelty wears off" to "Get bored of productivity system" to "Stop using productivity system"](/prodcycle.svg)

In the case of to-do list apps, at various times I've used:

- Reminders in Google Inbox, before that was shut down[^inbox]: I'm still annoyed that Inbox was shut down, it had the best email client I've ever used
- [Todoist](https://todoist.com/)
- [Roam](https://roamresearch.com/)


[^inbox]: Reminders still exist but aren't well integrated into Gmail. You can view and edit (but not create new reminders?) them at [reminders.google.com](https://reminders.google.com/). You can also see them in Google Calendar, but a calendar view is usually not a particularly good way to manage a to-do list. Google Calendar also shows all overdue reminders on the current day, even ones without a due date or that are set to be due when you are in a certain place.

Eventually I started using [Getting Things GNOME!](https://wiki.gnome.org/Apps/GTG), and I've used it ever since I first tried it 10 months ago. It is free and open source task manager application for Linux-based operating systems. It is designed for the [*Getting Things Done*](https://gettingthingsdone.com/) productivity system, but works well even when not using *Getting Things Done*.

Initially I used GTG just for keeping track of very short-term tasks: things that I'm doing *today*. Once I got comfortable with that, I started using it for more complex tasks, which GTG handles well. You can nest tasks, and children of a task are treated as prerequisites for their parent task.

As I decide I want to do tasks, I add them to GTG right away. I can set a start date for tasks that I can't do until after a certain date, and a due date. The *Actionable* view only shows tasks that I can do right now.

Sometimes I procrastinate on tasks, and they start piling up, continually moved to the current day every day. I try to avoid this, but sometimes I have to go through my tasks and prune old tasks that will never get done to prevent task list clutter.

One thing I've wanted to be able to do with GTG for a while is have some sort of calendar view. The recently released version 0.6 added support for CalDAV, which allows syncing tasks to a calendar service, such as [NextCloud Calendar](https://apps.nextcloud.com/apps/calendar). Since GTG doesn't have a built-in calendar view, being able to see tasks on an calendar this way is nice. It also makes it so my to-do list is integrated with the calendar I use to keep track of other events.

<!--
---

- have tried many productivity apps
- eventually landed on GTG
- foss
- plugins
- works well for simple usage
- start/due dates
- nested tasks work well

![](/ext/GTG-initial.png)
- https://fortintam.com/gtg/screenshots/wiki_main_screenshot.webp

---

- how I use it
- pruning old tasks
- keeping it fairly fresh
- no time scheduiling
- calendar integration
  - caldav in 0.6

-->