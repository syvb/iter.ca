+++
date = "2021-05-17T05:00:00Z"
description = "Recently I got a non-automated email from a government agency. While the email was interesting, what was more interesting was the email headers."
tags = ["email"]
# \u200B is zero-width space and allows breaking mid-word
title = "Security\u200BClassification\u200BLevel in email headers"
+++

Recently I got a non-automated email from a government agency. While the email was interesting, what was more interesting was the email headers, one of which looked like

```
x-titus-metadata-40: eyJDYXRlZ29yeUxhYmVs...
```

It was a long base64 encoded JSON blob (`{"...` is encoded as `ey...` in base64 making it easy to find base64 JSON in random text). What is this metadata? Decoding+beautifying it we get

```json
{
    "CategoryLabels": "",
    "Metadata": {
        "ns": "http://www.titus.com/ns/Canada Revenue Agency",
        "id": "c8ba42f7-485a-4f67-9d1c-d8894d61b092",
        "props": [{
            "n": "SecurityClassificationLevel",
            "vals": [{
                "value": "UNCLASSIFIED"
            }]
        }, {
            "n": "ENTRUSTPB",
            "vals": []
        }, {
            "n": "ENTRUSTPA",
            "vals": []
        }, {
            "n": "LanguageSelection",
            "vals": [{
                "value": "ENGLISH"
            }]
        }, {
            "n": "VISUALMARKINGS",
            "vals": [{
                "value": "NO"
            }]
        }]
    },
    "SubjectLabels": [],
    "TMCVersion": "18.8.1929.167",
    "TrustedLabelHash": "5znhThZ3xzv6l+uQTC2qtBUIn+l4v2gdmHRD0Y/bl0j3NE3rN1EMwNE+kj5dpk/l"
}
```

It looks like they have software ([Titus](https://www.titus.com/)) that automatically adds metadata about how emails are classified/protected. Neat! I unfortunately have not gotten any secret information emailed to me so I don't know what this would look like if the email was classified (although hopefully Titus would be able to prevent sending classified emails to people like me who shouldn't have access to it).

It also seems like this header isn't present in automated emails, which go through a different system to get to me.
