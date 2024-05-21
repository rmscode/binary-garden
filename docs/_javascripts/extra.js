// function findNewOrUpdatedContent()
// 	{
// 		let list = [];
// 		let period = 14;
// 		let priorDate = new Date(); priorDate.setDate(priorDate.getDate() - period);
// 		const options = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric' };
		
// 		let tms = document.querySelectorAll(".TmValue");
// 		for (let x = 0; x < tms.length; x++)
// 		{
// 			let dd = tms[x].innerText.split("-");
// 			let d = (dd.length == 1 ? dd[0] : dd[dd.length - 1]);
// 			d = new Date(d);

// 			let ddd = "";
// 			for(let y = 0; y < dd.length; y++)
// 			{
// 				if (ddd != "") { ddd += " &nbsp;-&nbsp; "; }
// 				ddd += dd[y].indexOf("CR") > -1 ? "Created " : "Updated ";
// 				ddd += (new Date(dd[y])).toLocaleDateString('en-US', options);
// 			}
// 			tms[x].innerHTML = ddd;
			
// 			if (d < priorDate) { continue; }

// 			let el = tms[x].previousElementSibling;
// 			while(true)
// 			{
// 				if (el.tagName.indexOf("H") == 0) { list.push("<li><span>" + d.getTime() + "</span><a href=\"#" + el.id + "\">" + el.innerText + "</a> - " + d.toLocaleDateString() + "</li>"); break; }
// 				try { el = el.previousElementSibling; } catch { console.log("failed " + x); break; }
// 			}
// 		}

// 		let sortedList = list.sort((a, b) => a.localeCompare(b, undefined, { numeric: true })).reverse();
// 		document.querySelector("#recentChanges").innerHTML = list != "" ? "<p>Besides updates made to Notes, the following sections have been created or updated in the last " + period + " days.</p><ul>" + sortedList.join("") + "</ul>" : "";
// 	}