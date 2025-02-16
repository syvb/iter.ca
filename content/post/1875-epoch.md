+++
date = "2025-02-15T00:00:00Z"
description = "The SSA can store dates before 1875"
tags = ["programming"]
title = "There is no 1875 epoch"
+++

A US government official said "we've got people in there that are about 150 years old" claiming social security benefits. 

Some people have claimed that the reason for this is that the Social Security Administration (SSA) uses an epoch in 1875 for storing dates, and these are just people with unknown years of birth stored as 0. I think the origin of these claims is [this post](https://x.com/toshiHQ/status/1889928670887739902):

> It looks like Elon’s genius coders don’t know how COBOL works.
>
> Social security runs on COBOL, which does not use a date or time type.  So the date is stored as a number using the ISO 8601 standard.  The epoch for this is 150 years ago (1875) - aka the metre standard.
>
> So if you don’t know the date of something, it will be a 0 value, which in COBOL will default to 1875 - 150 years ago.

I don't think this is true, for a few reasons.

## The database has years of birth before 1875

In 2007 the SSA [released a dataset](https://www.ssa.gov/policy/docs/ssb/v71n4/v71n4p33.html) "containing earnings records for individuals drawn from a 1-percent sample of all Social Security numbers (SSNs) issued before January 2007". They wrote:

> The final adjustments included removing 5,935 individuals whose [Year Of Birth] value was before 1870, removing 1,096 individuals whose YOB value was equal to 2007, and removing 4 individuals who were assigned a missing YOB value. Individuals born before 1870 were removed because they were unlikely to have received Social Security benefits.

They explictly say they have records of individuals born in 1869 and earlier, and that they can represent missing birth years!

## There is no spike of births in 1875

There is no spike in births in 1875 in that dataset, which you would expect if some process was setting unknown births to 1875:

![A graph showing no spike of births anywhere](/1875-records.svg)

The dataset is a 1% sample, so the actual amounts are ~100x larger.

## The SSA doesn't use ISO 8601

The Master Beneficiary Record, which tracks social security benefits payments, [was created in 1962](https://ajph.aphapublications.org/doi/pdf/10.2105/AJPH.73.11.1270) - *before* ISO 8601 was first published in 1988. The predecessor to that standard, ISO 2016 was published in 1976 - still too early, and also it has no reference any date in 1875.

[This research paper](https://pmc.ncbi.nlm.nih.gov/articles/PMC1651155/pdf/amjph00646-0038.pdf) based on SSA data said that the SSA stores birthdays in a fixed-width format:

> The data abstracted from the MBR consisted of a 26-character record for each deceased individual. The four data
> items on each record were... the month and year of death.

None of the datasets published by the SSA I found used ISO 8601 dates either; all of them have a seperate column for year of birth instead of using an ISO 8601 birthdate.

## ISO 8601 doesn't have an epoch

ISO 8601 is a format for representing dates as strings, not as numbers. It has no need for an epoch.

[Wikipedia says](https://en.wikipedia.org/wiki/ISO_8601#Dates):

> ISO 8601:2004 fixes a reference calendar date to the Gregorian calendar of 20 May 1875 as the date the Convention du Mètre (Metre Convention) was signed in Paris (the explicit reference date was removed in ISO 8601-1:2019). However, ISO calendar dates before the convention are still compatible with the Gregorian calendar all the way back to the official introduction of the Gregorian calendar on 15 October 1582. 

I.e. the standard only uses 20 May 1875 as a reference date to define the Gregorian calendar, not as some earliest representable date.

## Nobody uses 1875 as an epoch

I had found no evidence of 1875 ever being used as an epoch to start counting time from, in any context. I tried to find any case of this happening but I couldn't find any. It's definitely not a standard COBOL thing.

<!--

- "confidently wrong" lol https://bsky.app/profile/gregsmusings.bsky.social/post/3lia3lrrwgs2u

-->
