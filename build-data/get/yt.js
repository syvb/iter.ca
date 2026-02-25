process.env.TZ = "Etc/Utc"; // don't have date differences on CI

if (!process.env.REDO_YT) {
    console.log(`{"Type":"video","Thumb":"/yt-thumbs/5fh2oeugfbk.jpg","Uri":"https://youtube.com/watch?v=5fh2oeugfbk","Title":"Log-me-in challenge for Google CTF 2020","Date":{"Unix":1600115569},"Id":"yt-vid-5fh2oeugfbk"}
{"Type":"video","Thumb":"/yt-thumbs/yr-rNnk-4Gw.jpg","Uri":"https://youtube.com/watch?v=yr-rNnk-4Gw","Title":"Ship lock","Date":{"Unix":1600180224},"Id":"yt-vid-yr-rNnk-4Gw"}
{"Type":"video","Thumb":"/yt-thumbs/aLYKd7h7vgY.jpg","Uri":"https://youtube.com/watch?v=aLYKd7h7vgY","Title":"How Snowflake IDs work","Date":{"Unix":1601585823},"Id":"yt-vid-aLYKd7h7vgY"}
{"Type":"video","Thumb":"/yt-thumbs/46AKWNOJ3-Y.jpg","Uri":"https://youtube.com/watch?v=46AKWNOJ3-Y","Title":"How HOTP and TOTP work","Date":{"Unix":1604147504},"Id":"yt-vid-46AKWNOJ3-Y"}
{"Type":"video","Thumb":"/yt-thumbs/9sXEBzI1R5Q.jpg","Uri":"https://youtube.com/watch?v=9sXEBzI1R5Q","Title":"What's the Pareto frontier?","Date":{"Unix":1609769457},"Id":"yt-vid-9sXEBzI1R5Q"}
{"Type":"video","Thumb":"/yt-thumbs/GT6qpwlFhq0.jpg","Uri":"https://youtube.com/watch?v=GT6qpwlFhq0","Title":"How big is the set of subsets?","Date":{"Unix":1611093492},"Id":"yt-vid-GT6qpwlFhq0"}
{"Type":"video","Thumb":"/yt-thumbs/z7OpLXpj0xg.jpg","Uri":"https://youtube.com/watch?v=z7OpLXpj0xg","Title":"Transition with object across the screen in Blender","Date":{"Unix":1599224504},"Id":"yt-vid-z7OpLXpj0xg"}
{"Type":"video","Thumb":"/yt-thumbs/cJpE018QEkQ.jpg","Uri":"https://youtube.com/watch?v=cJpE018QEkQ","Title":"What is stochastic time tracking?","Date":{"Unix":1598383779},"Id":"yt-vid-cJpE018QEkQ"}
{"Type":"video","Thumb":"/yt-thumbs/FwpF0fqh7uU.jpg","Uri":"https://youtube.com/watch?v=FwpF0fqh7uU","Title":"TagTime Web - basic usage","Date":{"Unix":1597865788},"Id":"yt-vid-FwpF0fqh7uU"}
{"Type":"video","Thumb":"/yt-thumbs/hWXPaYslq7k.jpg","Uri":"https://youtube.com/watch?v=hWXPaYslq7k","Title":"Taking a screenshot of a scrolling webpage in Chrome","Date":{"Unix":1597361556},"Id":"yt-vid-hWXPaYslq7k"}
{"Type":"video","Thumb":"/yt-thumbs/NV4IQLs-WIs.jpg","Uri":"https://youtube.com/watch?v=NV4IQLs-WIs","Title":"UUIDv4 in 40 seconds","Date":{"Unix":1597069872},"Id":"yt-vid-NV4IQLs-WIs"}
{"Type":"video","Thumb":"/yt-thumbs/-xAFdVqwTn4.jpg","Uri":"https://youtube.com/watch?v=-xAFdVqwTn4","Title":"What changed in Google Drive on Sept. 30","Date":{"Unix":1595946040},"Id":"yt-vid--xAFdVqwTn4"}
{"Type":"video","Thumb":"/yt-thumbs/HE-t5aj8BvA.jpg","Uri":"https://youtube.com/watch?v=HE-t5aj8BvA","Title":"UUIDv3/5 generation","Date":{"Unix":1593806120},"Id":"yt-vid-HE-t5aj8BvA"}
{"Type":"video","Thumb":"/yt-thumbs/_KzQqfhQsck.jpg","Uri":"https://youtube.com/watch?v=_KzQqfhQsck","Title":"Why perfect squares have an odd number of factors","Date":{"Unix":1585853957},"Id":"yt-vid-_KzQqfhQsck"}
{"Type":"video","Thumb":"/yt-thumbs/dOQMqa86NF0.jpg","Uri":"https://youtube.com/watch?v=dOQMqa86NF0","Title":"Using proxies in Blender 2.82+ VSE","Date":{"Unix":1585075969},"Id":"yt-vid-dOQMqa86NF0"}
{"Type":"video","Thumb":"/yt-thumbs/THrlm3_c_YA.jpg","Uri":"https://youtube.com/watch?v=THrlm3_c_YA","Title":"Understanding Polish notation","Date":{"Unix":1584534448},"Id":"yt-vid-THrlm3_c_YA"}
{"Type":"video","Thumb":"/yt-thumbs/jqorVoYEd68.jpg","Uri":"https://youtube.com/watch?v=jqorVoYEd68","Title":"The Rendezvous Problem","Date":{"Unix":1576707300},"Id":"yt-vid-jqorVoYEd68"}
{"Type":"video","Thumb":"/yt-thumbs/LnNSImhEOpE.jpg","Uri":"https://youtube.com/watch?v=LnNSImhEOpE","Title":"Visualizing expression parsing","Date":{"Unix":1617659048},"Id":"yt-vid-LnNSImhEOpE"}
{"Type":"video","Thumb":"/yt-thumbs/ZxwM6nqHlpM.jpg","Uri":"https://youtube.com/watch?v=ZxwM6nqHlpM","Title":"1 + 1 = 2","Date":{"Unix":1574200881},"Id":"yt-vid-ZxwM6nqHlpM"}
{"Type":"video","Thumb":"/yt-thumbs/ezx1c7W1ngQ.jpg","Uri":"https://youtube.com/watch?v=ezx1c7W1ngQ","Title":"Falling cloth","Date":{"Unix":1593458507},"Id":"yt-vid-ezx1c7W1ngQ"}
{"Type":"video","Thumb":"/yt-thumbs/HlVReQiB_Wk.jpg","Uri":"https://youtube.com/watch?v=HlVReQiB_Wk","Title":"Ball of hair","Date":{"Unix":1598187705},"Id":"yt-vid-HlVReQiB_Wk"}
{"Type":"video","Thumb":"/yt-thumbs/RskJI6P1Y1U.jpg","Uri":"https://youtube.com/watch?v=RskJI6P1Y1U","Title":"Enter the honeycomb","Date":{"Unix":1598829351},"Id":"yt-vid-RskJI6P1Y1U"}
{"Type":"video","Thumb":"/yt-thumbs/A-nDTsGLYg4.jpg","Uri":"https://youtube.com/watch?v=A-nDTsGLYg4","Title":"Creating a YouTube series playlist","Date":{"Unix":1600107403},"Id":"yt-vid-A-nDTsGLYg4"}
{"Type":"video","Thumb":"/yt-thumbs/lbFb6VyWBS8.jpg","Uri":"https://youtube.com/watch?v=lbFb6VyWBS8","Title":"3 shuffling algorithms with sound","Date":{"Unix":1600296853},"Id":"yt-vid-lbFb6VyWBS8"}
{"Type":"video","Thumb":"/yt-thumbs/30jlrRMbhcw.jpg","Uri":"https://youtube.com/watch?v=30jlrRMbhcw","Title":"Sound of search algorithms","Date":{"Unix":1600375610},"Id":"yt-vid-30jlrRMbhcw"}
{"Type":"video","Thumb":"/yt-thumbs/gQxcldjmwaM.jpg","Uri":"https://youtube.com/watch?v=gQxcldjmwaM","Title":"Sound of reversing an array in-place","Date":{"Unix":1600383591},"Id":"yt-vid-gQxcldjmwaM"}
{"Type":"video","Thumb":"/yt-thumbs/YDNZTY7nC3Y.jpg","Uri":"https://youtube.com/watch?v=YDNZTY7nC3Y","Title":"Balls falling down stairs","Date":{"Unix":1602098546},"Id":"yt-vid-YDNZTY7nC3Y"}
{"Type":"video","Thumb":"/yt-thumbs/7tGBcc5f0uw.jpg","Uri":"https://youtube.com/watch?v=7tGBcc5f0uw","Title":"POV: rolling down a staircase","Date":{"Unix":1602183591},"Id":"yt-vid-7tGBcc5f0uw"}
{"Type":"video","Thumb":"/yt-thumbs/XDB0xra1gos.jpg","Uri":"https://youtube.com/watch?v=XDB0xra1gos","Title":"Rippling water","Date":{"Unix":1603146097},"Id":"yt-vid-XDB0xra1gos"}
{"Type":"video","Thumb":"/yt-thumbs/Y77Z8OKjIhQ.jpg","Uri":"https://youtube.com/watch?v=Y77Z8OKjIhQ","Title":"Turning gears","Date":{"Unix":1603299716},"Id":"yt-vid-Y77Z8OKjIhQ"}
{"Type":"video","Thumb":"/yt-thumbs/kfoxKfD2BwM.jpg","Uri":"https://youtube.com/watch?v=kfoxKfD2BwM","Title":"Hair","Date":{"Unix":1603807667},"Id":"yt-vid-kfoxKfD2BwM"}
{"Type":"video","Thumb":"/yt-thumbs/pmbbvVQ90Sw.jpg","Uri":"https://youtube.com/watch?v=pmbbvVQ90Sw","Title":"Clothing falling through sphere","Date":{"Unix":1603840166},"Id":"yt-vid-pmbbvVQ90Sw"}
{"Type":"video","Thumb":"/yt-thumbs/pVjg4L9EHlI.jpg","Uri":"https://youtube.com/watch?v=pVjg4L9EHlI","Title":"Shaky cam","Date":{"Unix":1604005294},"Id":"yt-vid-pVjg4L9EHlI"}
{"Type":"video","Thumb":"/yt-thumbs/1Wc__s2DQOk.jpg","Uri":"https://youtube.com/watch?v=1Wc__s2DQOk","Title":"Shaky cam 2","Date":{"Unix":1604088211},"Id":"yt-vid-1Wc__s2DQOk"}
{"Type":"video","Thumb":"/yt-thumbs/F8kOGjZj_gI.jpg","Uri":"https://youtube.com/watch?v=F8kOGjZj_gI","Title":"Ease-in-out function alpha values","Date":{"Unix":1605206191},"Id":"yt-vid-F8kOGjZj_gI"}
{"Type":"video","Thumb":"/yt-thumbs/nhUxBBTKKe8.jpg","Uri":"https://youtube.com/watch?v=nhUxBBTKKe8","Title":"Liquid thing","Date":{"Unix":1605449711},"Id":"yt-vid-nhUxBBTKKe8"}
{"Type":"video","Thumb":"/yt-thumbs/GZBhOsEl45k.jpg","Uri":"https://youtube.com/watch?v=GZBhOsEl45k","Title":"Rubies spinning","Date":{"Unix":1605650215},"Id":"yt-vid-GZBhOsEl45k"}
{"Type":"video","Thumb":"/yt-thumbs/n_gVHdbsTQg.jpg","Uri":"https://youtube.com/watch?v=n_gVHdbsTQg","Title":"2D bouncing ball","Date":{"Unix":1606171692},"Id":"yt-vid-n_gVHdbsTQg"}
{"Type":"video","Thumb":"/yt-thumbs/OKSsWLsWS_o.jpg","Uri":"https://youtube.com/watch?v=OKSsWLsWS_o","Title":"cool landscape thingie","Date":{"Unix":1606172713},"Id":"yt-vid-OKSsWLsWS_o"}
{"Type":"video","Thumb":"/yt-thumbs/j2rpDFtM3nM.jpg","Uri":"https://youtube.com/watch?v=j2rpDFtM3nM","Title":"Sun rise and set","Date":{"Unix":1609028757},"Id":"yt-vid-j2rpDFtM3nM"}
{"Type":"video","Thumb":"/yt-thumbs/KZSqyIm4vxs.jpg","Uri":"https://youtube.com/watch?v=KZSqyIm4vxs","Title":"Astroid","Date":{"Unix":1609192120},"Id":"yt-vid-KZSqyIm4vxs"}
{"Type":"video","Thumb":"/yt-thumbs/RENtuw4RV0Y.jpg","Uri":"https://youtube.com/watch?v=RENtuw4RV0Y","Title":"Colliding metacubes","Date":{"Unix":1610062965},"Id":"yt-vid-RENtuw4RV0Y"}
{"Type":"video","Thumb":"/yt-thumbs/Ec6kQBiPARA.jpg","Uri":"https://youtube.com/watch?v=Ec6kQBiPARA","Title":"Falling cones","Date":{"Unix":1610127810},"Id":"yt-vid-Ec6kQBiPARA"}
{"Type":"video","Thumb":"/yt-thumbs/YaRrIqStzt0.jpg","Uri":"https://youtube.com/watch?v=YaRrIqStzt0","Title":"Brightening light","Date":{"Unix":1610234275},"Id":"yt-vid-YaRrIqStzt0"}
{"Type":"video","Thumb":"/yt-thumbs/z4RIghoansU.jpg","Uri":"https://youtube.com/watch?v=z4RIghoansU","Title":"Softbody fail","Date":{"Unix":1610321457},"Id":"yt-vid-z4RIghoansU"}
{"Type":"video","Thumb":"/yt-thumbs/Dp0yrRK8qcE.jpg","Uri":"https://youtube.com/watch?v=Dp0yrRK8qcE","Title":"Ball falling down stairs on a windy day","Date":{"Unix":1610373090},"Id":"yt-vid-Dp0yrRK8qcE"}
{"Type":"video","Thumb":"/yt-thumbs/ewylHewWQT0.jpg","Uri":"https://youtube.com/watch?v=ewylHewWQT0","Title":"Deflated ball","Date":{"Unix":1610381087},"Id":"yt-vid-ewylHewWQT0"}
{"Type":"video","Thumb":"/yt-thumbs/FJNcYaO0bPI.jpg","Uri":"https://youtube.com/watch?v=FJNcYaO0bPI","Title":"Log-me-in: behind the scenes","Date":{"Unix":1610564064},"Id":"yt-vid-FJNcYaO0bPI"}
{"Type":"video","Thumb":"/yt-thumbs/BDFbDfISLB0.jpg","Uri":"https://youtube.com/watch?v=BDFbDfISLB0","Title":"Waves in horizon","Date":{"Unix":1610635853},"Id":"yt-vid-BDFbDfISLB0"}
{"Type":"video","Thumb":"/yt-thumbs/EywQ8MMU7cE.jpg","Uri":"https://youtube.com/watch?v=EywQ8MMU7cE","Title":"Sigma notation","Date":{"Unix":1610894361},"Id":"yt-vid-EywQ8MMU7cE"}
{"Type":"video","Thumb":"/yt-thumbs/34ukgzluq_k.jpg","Uri":"https://youtube.com/watch?v=34ukgzluq_k","Title":"Hexalight","Date":{"Unix":1611235307},"Id":"yt-vid-34ukgzluq_k"}
{"Type":"video","Thumb":"/yt-thumbs/6fEKuFbxZnU.jpg","Uri":"https://youtube.com/watch?v=6fEKuFbxZnU","Title":"Ease-in-out params in Desmos","Date":{"Unix":1610917253},"Id":"yt-vid-6fEKuFbxZnU"}
{"Type":"video","Thumb":"/yt-thumbs/YilTK9NtvnI.jpg","Uri":"https://youtube.com/watch?v=YilTK9NtvnI","Title":"Fall ball","Date":{"Unix":1611585984},"Id":"yt-vid-YilTK9NtvnI"}
{"Type":"video","Thumb":"/yt-thumbs/X42MZqXHXDM.jpg","Uri":"https://youtube.com/watch?v=X42MZqXHXDM","Title":"Compressing images with Paeth prediction","Date":{"Unix":1632593385},"Id":"yt-vid-X42MZqXHXDM"}
{"Type":"video","Thumb":"/yt-thumbs/I5sCnL1_sis.jpg","Uri":"https://youtube.com/watch?v=I5sCnL1_sis","Title":"Octahedron spinning","Date":{"Unix":1680879560},"Id":"yt-vid-I5sCnL1_sis"}`);
    return;
}

const fs = require("fs");

const ids = fs.readFileSync(__dirname + "/yt.txt", "utf-8").trim().split("\n");
(async () => {
    for (const id of ids) {
        const oemb = `https://www.youtube.com/oembed?url=https%3A//youtube.com/watch%3Fv%3D${id}&format=json`;
        const data = await (await fetch(oemb)).json();
        const wpage = await (await fetch(`https://www.youtube.com/watch?v=${id}`, {
            headers: {
                "Accept": "text/html",
                "User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.182 Safari/537.36"
            }
        })).text();
        const dateMatch = wpage.match(/<meta itemprop="uploadDate" content="([^"]+)">/);
        if (!dateMatch) {
            console.error(`Could not find uploadDate for ${id}`);
            continue;
        }
        console.log(JSON.stringify({
            Type: "video",
            Thumb: `/yt-thumbs/${id}.jpg`,
            Uri: `https://youtube.com/watch?v=${id}`,
            Title: data.title,
            Date: { Unix: (new Date(dateMatch[1])).valueOf() / 1000 },
            Id: `yt-vid-${id}`,
        }));
    }
})();
