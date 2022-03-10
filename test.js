const readline = require("readline");
const fs = require('fs');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});



// let inp = `Goodies and Prices:

// Fitbit Plus: 7980
// IPods: 22349
// MI Band: 999
// Cult Pass: 2799
// Macbook Pro: 229900
// Digital Camera: 11101
// Alexa: 9999
// Sandwich Toaster: 2195
// Microwave Oven: 9800
// Scale: 4999`



rl.question("enter", (distribute_to) => { // get user input for command prompt

    const inp= fs.readFileSync(__dirname+'/sample_input.txt',{encoding:'utf8', flag:'r'}); // Read file content

    distribute_to=Number(distribute_to)
    let gifts_cost_pair = inp.trim() // remove space at both end
        .split("\n"). // split by line
        slice(2,). // ignore first line
        map(line => line.split(": ")) // divide item as [item,price]
        .sort((a, b) => a[1] - b[1])  // sort by price
    // console.log("gifts_cost_pair", gifts_cost_pair)

    let min_diff = Infinity
    let item_range = {}
    for (let i = 0; i < gifts_cost_pair.length - distribute_to; i++) {
        const diff_btwn_next = Math.abs(gifts_cost_pair[i + distribute_to - 1][1] - gifts_cost_pair[i][1]) // ex: when distributing to 4 people get the diff between the items like item[i]-item[next_4th item]
        if (diff_btwn_next < min_diff) {
            min_diff = diff_btwn_next // check until get minimum of all
            item_range.start = i // note down starting & end points
            item_range.end = i + distribute_to - 1
        }
    }
    // console.log("min_diff", min_diff)
    // console.log("items", gifts_cost_pair.slice(item_range.start, item_range.end + 1))
    rl.close();

    const final_output_items=gifts_cost_pair.slice(item_range.start, item_range.end + 1)
    .map(item=>item.join(": "))
    .join("\n")



    const outout=`
The goodies selected for distribution are:

${final_output_items}

And the difference between the chosen goodie with highest price and the lowest price is ${min_diff}`


    fs.writeFileSync(__dirname+"/sample_output.txt", outout);
})

