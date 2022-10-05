+++
date = "2022-03-12T00:00:00Z"
description = "How I manage my answers to PDF forms in Git"
tags = ["programming", "fileformat", "pdf"]
title = "Tracking PDF forms as plain text"
+++

The [Canada Revenue Agency](https://www.canada.ca/en/revenue-agency.html), the agency responsible for collecting taxes in Canada, publishes many tax forms. These are usually available as a fillable PDF. With fillable PDFs, you can type in answers to form fields, save the PDF, and the saved PDF contains your answers.

I want to be able to keep track of the PDFs with my answers in them with Git, but tracking the PDFs with my answers in them doesn't work very well: you can't easily diff them, merge conflicts are difficult to resolve, and Git doesn't work well with large binary files.

I was able to find a good way to deal with this: extracting the data in PDF form fields to a standalone `.fdf` file. This file has just the data in the form fields. We can use [pdftk-java](https://gitlab.com/pdftk-java/pdftk) to extract the FDF from a PDF file. Some older versions are prone to crashing with certain PDFs that have filled forms, so make sure you are using a recent version.

```bash
$ pdftk t1.pdf generate_fdf output t1.fdf
cat t1.fdf90
$ cat t1.fdf | head -n 35
%FDF-1.2
%����
1 0 obj

<<
/FDF
<<
/Fields [
<<
/T (form1[0])
/Kids [
<<
/T (Page3[0])
/Kids [
<<
/T (Step2[0])
/Kids [
<<
/T (Line_10400_OtherEmploymentIncome[0])
/Kids [
<<
/T (Line_10400_Amount[0])
/V (47834.42)
>>]
>>
<<
/T (Line_12100_InvestmentIncome[0])
/Kids [
<<
/T (Line_12100_Amount[0])
/V (52455.55)
>>]
```
<br>

The FDF format is a tad verbose (it is a stripped down version of the PDF file format), but all of the form inputs are there: $47834.42 for my other employment income, and $52455.55 for my investment income. All of the other form inputs are in the file. `pdftk` generates the inputs in a weird order: it decided to start with step 2 on page 3. It seems to be consistent though, so there shouldn't be any big changes in diffs.

We can merge a modified FDF file back into the PDF similarly:
```bash
pdftk t1.pdf fill_form t1.fdf output filled.pdf
```
<br>

My general workflow is to take the existing FDF and create a filled PDF, edit that filled PDF, save it, then extract the new FDF. This way I can keep track of the file as a plaintext file tracked in Git, with diffs and merges working as expected.

Manipulating the form with a full PDF viewer, instead of typing values directly into the FDF file, ensures that the data you put in is validated. PDF files can have arbitrary embedded JavaScript to validate form inputs. The CRA takes extensive advantage of this feature, with ~4000 lines of common validation logic shared across all of their PDF forms. Unfortunately, not all PDF readers fully support PDF JavaScript, so most of the validation doesn't work if you aren't using an official PDF reader from Adobe. 

XFDF is an XML-based version of FDF that seems nicer to work with, but it doesn't have much support in the PDF tools ecosystem. Hopefully, more tools will gain the ability to deal with XFDF, since it's a much nicer format to deal with than FDF.

## Digression: Why use paper forms at all?
{{< dia "triplequestion" "Question" >}}
If you're going to track your answers electronically, why use the PDFs at all? Why not just use [NETFILE](https://www.canada.ca/en/revenue-agency/services/e-services/e-services-individuals/netfile-overview.html) and directly store the data?
{{< /dia >}}
I *had* looked into using NETFILE to directly store the tax return data as a `.tax` file. Unfortunately, only certified tax software can actually file returns using the service. You can't even access the API documentation without being certified.

They don't even let you send them filled PDFs electronically! I would be willing to directly send them my filled PDFs, but instead I have to print them out, mail the printed PDF to them, and have someone at the CRA type my form back into their system!
