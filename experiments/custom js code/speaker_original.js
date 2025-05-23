var filename = "EJY_polgrice_goals_v4"
var condCounts = "1,5;2,5;" //Example: "1,20;2,20;3,20"

// ---------------- HELPER ------------------
var NUM_SLIDERS = 10;
var NUM_SLIDERS1 = 10;
var NUM_SLIDERS2 = 2;

function showSlide(id) {
    $(".slide").hide();
    $("#" + id).show();
}

function random(a, b) {
    if (typeof b == "undefined") {
        a = a || 2;
        return Math.floor(Math.random() * a);
    } else {
        return Math.floor(Math.random() * (b - a + 1)) + a;
    }
}

function clearForm(oForm) {
    var elements = oForm.elements;
    oForm.reset();

    for (var i = 0; i < elements.length; i++) {
        field_type = elements[i].type.toLowerCase();
        switch (field_type) {
            case "text":
            case "password":
            case "textarea":
            case "hidden":

                elements[i].value = "";
                break;

            case "radio":
            case "checkbox":
                if (elements[i].checked) {
                    elements[i].checked = false;
                }
                break;
                
            case "select-one":
            case "select-multi":
                elements[i].selectedIndex = -1;
                break;

            default:
                break;
        }
    }
}

Array.prototype.random = function () {
    return this[random(this.length)];
}

// shuffle function
function shuffle(a) {
    var o = [];
    for (var i = 0; i < a.length; i++) {
        o[i] = a[i];
    }
    for (var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}

function shuffledArray(arrLength) {
    var j, tmp;
    var arr = new Array(arrLength);
    for (i = 0; i < arrLength; i++) {
        arr[i] = i;
    }
    for (i = 0; i < arrLength - 1; i++) {
        j = Math.floor((Math.random() * (arrLength - 1 - i)) + 0.99) + i;
        tmp = arr[i];
        arr[i] = arr[j];
        arr[j] = tmp;
    }
    return arr;
}

function shuffledSampleArray(arrLength, sampleLength) {
    var arr = shuffledArray(arrLength);
    var beginIndex = Math.floor(Math.random() * (arrLength - sampleLength + 1));
    return arr.slice(beginIndex, beginIndex + sampleLength);
}

function getRadioCheckedValue(formNum, radio_name) {
    var oRadio = document.forms[formNum].elements[radio_name];
    for (var i = 0; i < oRadio.length; i++) {
        if (oRadio[i].checked) {
            return oRadio[i].value;
        }
    }
    return '';
}


// ---------------- PARAMETERS ------------------

// CONDITION ASSIGNMENT
var cond = random(4)+1;
var expt = "polgrice_speaker_pilot2_both_social";

// call the maker getter to get the cond variable 
//var xmlHttp = null;
//xmlHttp = new XMLHttpRequest();
//xmlHttp.open( "GET", "https://langcog.stanford.edu/cgi-bin/subject_equalizer/maker_getter.php?conds=" + condCounts +"&filename=" + filename, false );
//xmlHttp.send( null );
//var cond = xmlHttp.responseText;

var score = shuffle(["nice", "honest", "both"]);
var prediction = shuffle(["ask", "like"])
var state_knowledge = "unknown";

var domains1 = shuffle([
    "poem","cake","cookie","presentation","song",
    "film","solo","monologue","dance","painting",
    "app","review","recital"
  ]);
  var domains = domains1;                       
  

var states1 = shuffle(["heart0","heart1","heart2","heart3"]);
var states  = [...states1, ...states1, ...states1];  

var posneg1 = ["was", "wasn't"];
var posneg_code1 = ["no_neg", "neg"];
var posneg2 = ["wasn't", "was"];
var posneg_code2 = ["neg", "no_neg"];

var keywords1 = ["terrible", "bad", "okay", "good", "amazing"];
var keywords2 = ["amazing", "good", "okay", "bad", "terrible"];

if (cond == 1) {
    var posneg = posneg1
    var posneg_code = posneg_code1
    var keywords = keywords1
} else if (cond == 2) {
    var posneg = posneg1
    var posneg_code = posneg_code1
    var keywords = keywords2
} else if (cond == 3) {
    var posneg = posneg2
    var posneg_code = posneg_code2
    var keywords = keywords1
} else {
    var posneg = posneg2
    var posneg_code = posneg_code2
    var keywords = keywords2
}

var utterances1 = 
    ["yes_terrible", "yes_bad", "yes_okay", "yes_good", "yes_amazing"];
var utterances2 = 
    ["not_terrible", "not_bad", "not_okay", "not_good", "not_amazing"];
var utterances3 = 
    ["yes_amazing", "yes_good", "yes_okay", "yes_bad", "yes_terrible"];
var utterances4 = 
    ["not_amazing", "not_good", "not_okay", "not_bad", "not_terrible"];

if (cond == 1) {
    var utterances_mixed = utterances1.concat(utterances2)
} else if (cond == 2) {
    var utterances_mixed = utterances2.concat(utterances1)    
} else if (cond == 3) {
    var utterances_mixed = utterances3.concat(utterances4)
} else {
    var utterances_mixed = utterances4.concat(utterances3)
}

var utterances = utterances_mixed.concat(utterances_mixed, utterances_mixed)

var blank_utterances = "universal"

var goals1 = ["both","both","both","both"];
var goals2 = ["informative","informative","informative","informative"];
var goals3 = ["social","social","social","social"];
var goal_list = shuffle([goals1, goals2, goals3]);
var goals = goal_list[0].concat(goal_list[1], goal_list[2])

const allConditions = 
        shuffle(
            [
            {"domain": domains[0],
            "state": states[0],
            "blank_utterance": blank_utterances,
            "utterance": utterances[0],
            "people": "people1",
            "goal": goals[0],
            },
            {"domain": domains[1],
            "state": states[1],
            "utterance": utterances[1],
            "people": "people2",
            "goal": goals[1],
            "blank_utterance": blank_utterances,
            },
            {"domain": domains[2],
            "state": states[2],
            "utterance": utterances[2],
            "people": "people3",
            "goal": goals[2],
            "blank_utterance": blank_utterances,
            },
            {"domain": domains[3],
            "state": states[3],
            "utterance": utterances[3],
            "people": "people4",
            "goal": goals[3],
            "blank_utterance": blank_utterances,
            },
            {"domain": domains[4],
            "state": states[4],
            "utterance": utterances[4],
            "people": "people5",
            "goal": goals[4],
            "blank_utterance": blank_utterances,
            },
            {"domain": domains[5],
            "state": states[5],
            "utterance": utterances[5],
            "people": "people6",
            "goal": goals[5],
            "blank_utterance": blank_utterances,
            },
            {"domain": domains[6],
            "state": states[6],
            "utterance": utterances[6],
            "people": "people7",
            "goal": goals[6],
            "blank_utterance": blank_utterances,
            },
            {"domain": domains[7],
            "state": states[7],
            "utterance": utterances[7],
            "people": "people8",
            "goal": goals[7],
            "blank_utterance": blank_utterances,
            },
            {"domain": domains[8],
            "state": states[8],
            "utterance": utterances[8],
            "people": "people9",
            "goal": goals[8],
            "blank_utterance": blank_utterances,
            },
            {"domain": domains[9],
            "state": states[9],
            "utterance": utterances[9],
            "people": "people10",
            "goal": goals[9],
            "blank_utterance": blank_utterances,
            },
            {"domain": domains[10],
             "state": states[10],
             "utterance": utterances[10],
             "people": "people11",
             "goal": goals[10],
             "blank_utterance": blank_utterances,
            },
            {"domain": domains[11],
             "state": states[11],
             "utterance": utterances[11],
             "people": "people12",
             "goal": goals[11],
             "blank_utterance": blank_utterances,
            },
            ]
        );



speakers = shuffle([["John", "Bob", ], ["Hailey", "Mika"], ["Karen", "Jenny"], ["Kyle", "James"], ["Sean", "Chris"],
                    ["Lucy", "Sarah"], ["Bill", "Tom"], ["Heather", "Grace"], ["Jake", "Kevin"], ["Ann", "Diana"],
                    ["George", "Henry"], ["Nathan", "Patrick"], ["Wendy", "Emma"], ["Stephanie", "Barbara"], ["Oliver", "Robert"],
                    ["Matt", "Larry"], ["Steven", "Zack"], ["Fiona", "Yvonne"], ["Rebecca", "Cheryl"], ["Victoria", "Jasmine"],
                    ["Albert", "Frank"], ["Greg", "Colin"], ["Ed", "Peter"], ["Molly", "Kara"], ["Justine", "Kelly"]]);
speakers1 = shuffle(speakers[0]);
speakers2 = shuffle(speakers[1]);
speakers3 = shuffle(speakers[2]);
speakers4 = shuffle(speakers[3]);
speakers5 = shuffle(speakers[4]);
speakers6 = shuffle(speakers[5]);
speakers7 = shuffle(speakers[6]);
speakers8 = shuffle(speakers[7]);
speakers9 = shuffle(speakers[8]);
speakers10 = shuffle(speakers[9]);
speakers11 = shuffle(speakers[10]);
speakers12 = shuffle(speakers[11]);
speakers13 = shuffle(speakers[12]);
speakers14 = shuffle(speakers[13]);
speakers15 = shuffle(speakers[14]);
speakers16 = shuffle(speakers[15]);
speakers17 = shuffle(speakers[16]);
speakers18 = shuffle(speakers[17]);
speakers19 = shuffle(speakers[18]);
speakers20 = shuffle(speakers[19]);
speakers21 = shuffle(speakers[20]);
speakers22 = shuffle(speakers[21]);
speakers23 = shuffle(speakers[22]);
speakers24 = shuffle(speakers[23]);
speakers25 = shuffle(speakers[24]);


var sents = {
    states: {
        heart0: {
            state: "0"
        },
        heart1: {
            state: "33.3333333"
        },
        heart2: {
            state: "66.6666667"
        },
        heart3: {
            state: "100"
        },
    },

    blank_utterances: {
      universal: {
          sent_utterance: " <b>\"______________,\"</b> SP said."
      }
    },

    utterances: {
        yes_terrible: {
            sent_utterance: "<b>\"It was terrible\"</b>"
        },        
        yes_bad: {
            sent_utterance: "<b>\"It was bad\"</b>"
        },        
        yes_okay: {
            sent_utterance: "<b>\"It was okay\"</b>"
        },        
        yes_good: {
            sent_utterance: "<b>\"It was good\"</b>"
        },        
        yes_amazing: {
            sent_utterance: "<b>\"It was amazing\"</b>"
        },
        not_terrible: {
            sent_utterance: "<b>\"It wasn't terrible\"</b>"
        },        
        not_bad: {
            sent_utterance: "<b>\"It wasn't bad\"</b>"
        },        
        not_okay: {
            sent_utterance: "<b>\"It wasn't okay\"</b>"
        },        
        not_good: {
            sent_utterance: "<b>\"It wasn't good\"</b>"
        },        
        not_amazing: {
            sent_utterance: "<b>\"It wasn't amazing\"</b>"
        },
   },
    domains: {
        presentation: {
            sent_precontext: "Imagine that LS just gave a presentation, ",
            sent_context: " LS approached SP, who knows a lot about giving presentations, and asked \"How was my presentation?\"",
            sent_context2: " SP saw the presentation.",
            BB: "presentation",
        },
        cookie: {
            sent_precontext: "Imagine that LS baked some cookies, ",
            sent_context: " LS approached SP, who knows a lot about baking, and asked \"How did my cookie taste?\"",
            sent_context2: " SP tasted the cookie.",
            BB: "cookie",
        },
        poem: {
            sent_precontext: "Imagine that LS wrote a poem, ",
            sent_context: " LS approached SP, who knows a lot about poems, and asked \"How was my poem?\"",
            sent_context2: " SP read the poem.",
            BB: "poem",
        },
        cake: {
            sent_precontext: "Imagine that LS baked a cake, ",
            sent_context: " LS approached SP, who knows a lot about baking, and asked \"How did my cake taste?\"",
            sent_context2: " SP tasted the cake.",
            BB: "cake",
        },
        song: {
            sent_precontext: "Imagine that LS composed a song, ",
            sent_context: " LS approached SP, who knows a lot about composing songs, and asked \"How was my song?\"",
            sent_context2: " SP heard the song.",
            BB: "song",
        },
        film: {
            sent_precontext: "Imagine that LS filmed a movie, ",
            sent_context: " LS approached SP, who knows a lot about movies, and asked \"How was my movie?\"",
            sent_context2: " SP saw the movie.",
            BB: "movie",
        },
        solo: {
            sent_precontext: "Imagine that LS played a cello solo part at a concert, ",
            sent_context: " LS approached SP, who knows a lot about playing cello, and asked \"How was my solo?\"",
            sent_context2: " SP heard the solo.",
            BB: "solo",
        },
        dance: {
            sent_precontext: "Imagine that LS gave a tap dance performance, ",
            sent_context: " LS approached SP, who knows a lot about tap dance, and asked \"How was my dance?\"",
            sent_context2: " SP saw the dance.",
            BB: "dance",
        },
        painting: {
            sent_precontext: "Imagine that LS drew a painting, ",
            sent_context: " LS approached SP, who knows a lot about paintings, and asked \"How was my painting?\"",
            sent_context2: " SP saw the painting.",
            BB: "painting",
        },
        monologue: {
            sent_precontext: "Imagine that LS gave a monologue during a school play, ",
            sent_context: " LS approached SP, who knows a lot about giving monologues, and asked \"How was my monologue?\"",
            sent_context2: " SP heard the monologue.",
            BB: "monologue",
        },
        app: {
            sent_precontext: "Imagine that LS designed a mobile app, ",
            sent_context: " LS approached SP, who knows a lot about mobile apps, and asked \"How was my app?\"",
            sent_context2: " SP saw the app.",
            BB: "app",
        },
        review: {
            sent_precontext: "Imagine that LS wrote a review for a book, ",
            sent_context: " LS approached SP, who knows a lot about writing reviews, and asked \"How was my review?\"",
            sent_context2: " SP read the review.",
            BB: "review",
        },
        recital: {
            sent_precontext: "Imagine that LS had a piano recital, ",
            sent_context: " LS approached SP, who knows a lot about playing piano, and asked \"How was my performance?\"",
            sent_context2: " SP attended the recital.",
            BB: "performance",
        },
    },

    goals: {
        both: {
            goal: " <b>If SP wanted to BOTH make LS feel good AND give accurate informative feedback</b>, <br><br>"
        },
        informative: {
            goal: " <b>If SP wanted to give accurate and informative feedback</b> but not necessarily make LS feel good, <br><br>"
        },
        social: {
            goal: " <b>If SP wanted to make LS feel good</b> but not necessarily give accurate and informative feedback, <br><br>"
        },
    },
    people: {
        people1: {
            SP: speakers1[0],
            LS: speakers1[1],
        },
        people2: {
            SP: speakers2[0],
            LS: speakers2[1],
        },
        people3: {
            SP: speakers3[0],
            LS: speakers3[1],
        },
        people4: {
            SP: speakers4[0],
            LS: speakers4[1],
        },
        people5: {
            SP: speakers5[0],
            LS: speakers5[1],
        },
        people6: {
            SP: speakers6[0],
            LS: speakers6[1],
        },
        people7: {
            SP: speakers7[0],
            LS: speakers7[1],
        },
        people8: {
            SP: speakers8[0],
            LS: speakers8[1],
        },
        people9: {
            SP: speakers9[0],
            LS: speakers9[1],
        },
        people10: {
            SP: speakers10[0],
            LS: speakers10[1],
        },
        people11: {
            SP: speakers11[0],
            LS: speakers11[1],
        },
        people12: {
            SP: speakers12[0],
            LS: speakers12[1],
        },
        people13: {
            SP: speakers13[0],
            LS: speakers13[1],
        },
        people14: {
            SP: speakers14[0],
            LS: speakers14[1],
        },
        people15: {
            SP: speakers15[0],
            LS: speakers15[1],
        },
        people16: {
            SP: speakers16[0],
            LS: speakers16[1],
        },
        people17: {
            SP: speakers17[0],
            LS: speakers17[1],
        },
        people18: {
            SP: speakers18[0],
            LS: speakers18[1],
        },
        people19: {
            SP: speakers19[0],
            LS: speakers19[1],
        },
        people20: {
            SP: speakers20[0],
            LS: speakers20[1],
        },
        people21: {
            SP: speakers21[0],
            LS: speakers21[1],
        },
        people22: {
            SP: speakers22[0],
            LS: speakers22[1],
        },
        people23: {
            SP: speakers23[0],
            LS: speakers23[1],
        },
        people24: {
            SP: speakers24[0],
            LS: speakers24[1],
        },
        people25: {
            SP: speakers25[0],
            LS: speakers25[1],
        },
    }
};


function doSentSubs(sents, polite, domain, utterance, people, goal, blank_utterance) {
    utterance = sents["utterances"][utterance]["sent_utterance"];
    blank_utterance = sents["blank_utterances"]["universal"]["sent_utterance"];
    precontext = sents["domains"][domain]["sent_precontext"];
    context = sents["domains"][domain]["sent_context"];
    context2 = sents["domains"][domain]["sent_context2"];
    state = sents["states"][state]["state"]
    goal = sents["goals"][goal]["goal"]
    if (state_knowledge == "known") {
        knowledge = " <b>and LS knew it</b>."
    } else if (state_knowledge == "unknown") {
        knowledge = " but LS didn't know how good it was."
    }

    feeling = "Here's how SP <b>actually</b> felt about LS's BB, on a scale of 0 to 3 hearts:"
    question0 = "GOAL"
    question = "What would SP be most likely to say?"
    question2 = "How would SP <b>actually</b> rate LS's BB? <br>Please select the number of stars you think SP would actually give:";
    question3 = "Based on what SP said, how likely is it for you to <b>like SP</b>?";
    BB = sents["domains"][domain]["BB"]; //Item 2
    SP = sents["people"][people]["SP"]; //speaker
    LS = sents["people"][people]["LS"]; //addressee

    utterance = utterance.replace("BB", BB).replace("SP", SP).replace("LS", LS);
    blank_utterance = blank_utterance.replace("BB", BB).replace("SP", SP).replace("LS", LS);
    context = context.replace("BB", BB).replace("SP", SP).replace("SP", SP).replace("SP", SP).replace("SP", SP).replace("SP", SP).replace("SP", SP).replace("LS", LS).replace("LS", LS).replace("LS", LS);
    context2 = context2.replace("BB", BB).replace("SP", SP).replace("SP", SP).replace("SP", SP).replace("SP", SP).replace("SP", SP).replace("SP", SP).replace("LS", LS).replace("LS", LS).replace("LS", LS);
    precontext = precontext.replace("BB", BB).replace("SP", SP).replace("SP", SP).replace("SP", SP).replace("SP", SP).replace("SP", SP).replace("SP", SP).replace("LS", LS).replace("LS", LS).replace("LS", LS);
    state = state.replace("BB", BB).replace("SP", SP).replace("SP", SP).replace("SP", SP).replace("SP", SP).replace("SP", SP).replace("SP", SP).replace("LS", LS).replace("LS", LS).replace("LS", LS);
    question = question.replace("BB", BB).replace("SP", SP).replace("SP", SP).replace("SP", SP).replace("SP", SP).replace("SP", SP).replace("SP", SP).replace("LS", LS).replace("LS", LS).replace("LS", LS);
    question0 = question0.replace("BB", BB).replace("SP", SP).replace("SP", SP).replace("SP", SP).replace("SP", SP).replace("SP", SP).replace("SP", SP).replace("LS", LS).replace("LS", LS).replace("LS", LS).replace("GOAL", goal).replace("LS", LS).replace("SP", SP);    
    question2 = question2.replace("BB", BB).replace("SP", SP).replace("SP", SP).replace("SP", SP).replace("SP", SP).replace("SP", SP).replace("SP", SP).replace("LS", LS).replace("LS", LS).replace("LS", LS);
    question3 = question3.replace("BB", BB).replace("SP", SP).replace("SP", SP).replace("SP", SP).replace("SP", SP).replace("SP", SP).replace("SP", SP).replace("LS", LS).replace("LS", LS).replace("LS", LS);
    knowledge = knowledge.replace("BB", BB).replace("SP", SP).replace("SP", SP).replace("SP", SP).replace("SP", SP).replace("SP", SP).replace("SP", SP).replace("LS", LS).replace("LS", LS).replace("LS", LS);
    goal = goal.replace("BB", BB).replace("SP", SP).replace("SP", SP).replace("SP", SP).replace("SP", SP).replace("SP", SP).replace("SP", SP).replace("LS", LS).replace("LS", LS).replace("LS", LS);
    feeling = feeling.replace("BB", BB).replace("SP", SP).replace("SP", SP).replace("SP", SP).replace("SP", SP).replace("SP", SP).replace("SP", SP).replace("LS", LS).replace("LS", LS).replace("LS", LS);


    return [utterance, context, state, precontext, question, question2, question3, knowledge, goal, feeling, context2, blank_utterance, question0];
}


var numConditions = allConditions.length;
var allTrialOrders = allConditions;
var numTrials = allTrialOrders.length;
var shuffledOrder = shuffledSampleArray(allTrialOrders.length, numTrials);
var currentTrialNum = 0;
var trial;
var numComplete = 0;
var buyer;

showSlide("instructions");
$("#trial-num").html(numComplete);
$("#total-num").html(numTrials);


var experiment = {

    data: {
        expt: expt,
        cond: cond,
        order: [],
        knowledge: state_knowledge,
        domain: [],
        state: [],
        posneg: [],
        keyword:[],
        people: [],
        goal: [],
        language: [],
        expt_aim: [],
        goal_thoughts: [],
        expt_gen: [],
        numTrials: numTrials
    },

    end: function () {
        experiment.data.language.push(document.getElementById("homelang").value);
        experiment.data.expt_aim.push(document.getElementById("expthoughts").value);
        experiment.data.goal_thoughts.push(document.getElementById("goal_thoughts").value);
        experiment.data.expt_gen.push(document.getElementById("expcomments").value);
        showSlide("finished");

        //    			//Decrement			
        //			var xmlHttp = null;
        //			xmlHttp = new XMLHttpRequest()
        //			xmlHttp.open("GET", "http://langcog.stanford.edu/cgi-bin/subject_equalizer/decrementer.php?filename=" + filename + "&to_decrement=" + cond, false);
        //			xmlHttp.send(null)

        saveWithDataPipe();
    },

    next: function () {
        $('html,body').scrollTop(0); 
        {
            if (numComplete > 0) {
                experiment.data.order.push(numComplete);
                experiment.data.goal.push(trial.goal);
                experiment.data.domain.push(trial.domain);
                experiment.data.state.push(trial.state);
                experiment.data.posneg.push($("#posneg_choice").val()),
                experiment.data.keyword.push($("#keyword_choice").val()),

                clearForm(document.forms[0]);

                //Clear stars
                $(".rating-stars").attr({
                    "style": "width: 0%"
                });

            }
            if (numComplete >= numTrials) {
                $('.bar').css('width', (200.0 * numComplete / numTrials) + 'px');
                $("#trial-num").html(numComplete);
                $("#total-num").html(numTrials);
                showSlide("askInfo");
            } else {
                $('.bar').css('width', (200.0 * numComplete / numTrials) + 'px');
                $("#trial-num").html(numComplete);
                $("#total-num").html(numTrials);
                currentTrialNum = numComplete;
//                trial = allTrialOrders[shuffledOrder[numComplete]];
                trial = allTrialOrders[numComplete];
                utterance = trial.utterance;
                state = trial.state;
                domain = trial.domain;
                context = trial.context;
                people = trial.people;
                goal = trial.goal;
                sent_materials = doSentSubs(sents, state, domain, utterance, people, goal);
                showSlide("stage");
                $("#context").html(sent_materials[3] + sent_materials[7] + sent_materials[1]);
//                $("#context2").html(sent_materials[11]);
                $("#question0").html(sent_materials[8] + sent_materials[4]);
                $("#question2").html(sent_materials[0]);
                $(".rating-stars").attr("style", "width: " +
                    state + "%");


                for (var i = 0; i < 2; i++) {
                    $("#posneg" + i).html(posneg[i]);
                }
                for (var i = 0; i < 5; i++) {
                    $("#keyword" + i).html(keywords[i]);
                }
                $("#question2").html(sent_materials[9]);
                $("#question3").html(sent_materials[11]);
                numComplete++;
            }
        }
    }
}

// scripts for sliders
$("#slider0").slider({
    animate: true,
    orientation: "horizontal",
    max: 40,
    min: 0,
    step: 1,
    value: 20,
    slide: function (event, ui) {
        $("#slider0 .ui-slider-handle").css({
            "background": "#E0F5FF",
            "border-color": "#001F29"
        });
    },
    change: function (event, ui) {
        $('#hiddenSliderValue0').attr('value', ui.value);
        $("#slider0").css({
            "background": "#99D6EB"
        });
        $("#slider0 .ui-slider-handle").css({
            "background": "#667D94",
            "border-color": "#001F29"
        });
    }
});
$("#slider1").slider({
    animate: true,
    orientation: "horizontal",
    max: 40,
    min: 0,
    step: 1,
    value: 20,
    slide: function (event, ui) {
        $("#slider1 .ui-slider-handle").css({
            "background": "#E0F5FF",
            "border-color": "#001F29"
        });
    },
    change: function (event, ui) {
        $('#hiddenSliderValue1').attr('value', ui.value);
        $("#slider1").css({
            "background": "#99D6EB"
        });
        $("#slider1 .ui-slider-handle").css({
            "background": "#667D94",
            "border-color": "#001F29"
        });
    }
});
$("#slider2").slider({
    animate: true,
    orientation: "horizontal",
    max: 40,
    min: 0,
    step: 1,
    value: 20,
    slide: function (event, ui) {
        $("#slider2 .ui-slider-handle").css({
            "background": "#E0F5FF",
            "border-color": "#001F29"
        });
    },
    change: function (event, ui) {
        $('#hiddenSliderValue2').attr('value', ui.value);
        $("#slider2").css({
            "background": "#99D6EB"
        });
        $("#slider2 .ui-slider-handle").css({
            "background": "#667D94",
            "border-color": "#001F29"
        });
    }
});

$("#slider3").slider({
    animate: true,
    orientation: "horizontal",
    max: 40,
    min: 0,
    step: 1,
    value: 20,
    slide: function (event, ui) {
        $("#slider3 .ui-slider-handle").css({
            "background": "#E0F5FF",
            "border-color": "#001F29"
        });
    },
    change: function (event, ui) {
        $('#hiddenSliderValue3').attr('value', ui.value);
        $("#slider3").css({
            "background": "#99D6EB"
        });
        $("#slider3 .ui-slider-handle").css({
            "background": "#667D94",
            "border-color": "#001F29"
        });
    }
});

$("#slider4").slider({
    animate: true,
    orientation: "horizontal",
    max: 40,
    min: 0,
    step: 1,
    value: 20,
    slide: function (event, ui) {
        $("#slider4 .ui-slider-handle").css({
            "background": "#E0F5FF",
            "border-color": "#001F29"
        });
    },
    change: function (event, ui) {
        $('#hiddenSliderValue4').attr('value', ui.value);
        $("#slider4").css({
            "background": "#99D6EB"
        });
        $("#slider4 .ui-slider-handle").css({
            "background": "#667D94",
            "border-color": "#001F29"
        });
    }
});

$("#slider5").slider({
    animate: true,
    orientation: "horizontal",
    max: 40,
    min: 0,
    step: 1,
    value: 20,
    slide: function (event, ui) {
        $("#slider5 .ui-slider-handle").css({
            "background": "#E0F5FF",
            "border-color": "#001F29"
        });
    },
    change: function (event, ui) {
        $('#hiddenSliderValue5').attr('value', ui.value);
        $("#slider5").css({
            "background": "#99D6EB"
        });
        $("#slider5 .ui-slider-handle").css({
            "background": "#667D94",
            "border-color": "#001F29"
        });
    }
});

$("#slider6").slider({
    animate: true,
    orientation: "horizontal",
    max: 40,
    min: 0,
    step: 1,
    value: 20,
    slide: function (event, ui) {
        $("#slider6 .ui-slider-handle").css({
            "background": "#E0F5FF",
            "border-color": "#001F29"
        });
    },
    change: function (event, ui) {
        $('#hiddenSliderValue6').attr('value', ui.value);
        $("#slider6").css({
            "background": "#99D6EB"
        });
        $("#slider6 .ui-slider-handle").css({
            "background": "#667D94",
            "border-color": "#001F29"
        });
    }
});

$("#slider7").slider({
    animate: true,
    orientation: "horizontal",
    max: 40,
    min: 0,
    step: 1,
    value: 20,
    slide: function (event, ui) {
        $("#slider7 .ui-slider-handle").css({
            "background": "#E0F5FF",
            "border-color": "#001F29"
        });
    },
    change: function (event, ui) {
        $('#hiddenSliderValue7').attr('value', ui.value);
        $("#slider7").css({
            "background": "#99D6EB"
        });
        $("#slider7 .ui-slider-handle").css({
            "background": "#667D94",
            "border-color": "#001F29"
        });
    }
});

$("#slider8").slider({
    animate: true,
    orientation: "horizontal",
    max: 40,
    min: 0,
    step: 1,
    value: 20,
    slide: function (event, ui) {
        $("#slider8 .ui-slider-handle").css({
            "background": "#E0F5FF",
            "border-color": "#001F29"
        });
    },
    change: function (event, ui) {
        $('#hiddenSliderValue8').attr('value', ui.value);
        $("#slider8").css({
            "background": "#99D6EB"
        });
        $("#slider8 .ui-slider-handle").css({
            "background": "#667D94",
            "border-color": "#001F29"
        });
    }
});

$("#slider9").slider({
    animate: true,
    orientation: "horizontal",
    max: 40,
    min: 0,
    step: 1,
    value: 20,
    slide: function (event, ui) {
        $("#slider9 .ui-slider-handle").css({
            "background": "#E0F5FF",
            "border-color": "#001F29"
        });
    },
    change: function (event, ui) {
        $('#hiddenSliderValue9').attr('value', ui.value);
        $("#slider9").css({
            "background": "#99D6EB"
        });
        $("#slider9 .ui-slider-handle").css({
            "background": "#667D94",
            "border-color": "#001F29"
        });
    }
});


async function saveWithDataPipe () {

    /* ------------ 1. Build the CSV text -------------------- */
    const header = ['order','domain','state','posneg','keyword','goal', 
        'language','exp_aim','goal_thoughts','expt_gens'];
  
    const rows   = experiment.data.order.map((_, i) => [
        experiment.data.order[i],
        experiment.data.domain[i],
        experiment.data.state[i],
        experiment.data.posneg[i],
        experiment.data.keyword[i],
        experiment.data.goal[i],
        experiment.data.language[0] ?? '',
        experiment.data.expt_aim[0] ?? '',
        experiment.data.goal_thoughts[0] ?? '',
        experiment.data.expt_gen[0] ?? ''
    ]);

    /* glue everything together */
    const csvText = [header.join(','),
                     ...rows.map(r => r.join(','))]
                     .join('\n');
  
    /* ------------ 2. Upload using the DataPipe template ---- */
    try {
      await fetch('https://pipe.jspsych.org/api/data/', {   // note trailing “/”
        method : 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept        : '*/*'
        },
        body: JSON.stringify({
          experimentID : '7Ssa77jZ2BaU',              
          filename     : `participant_${Date.now()}.csv`,   // unique name
          data         : csvText                            // CSV string
        })
      });
  
      document.getElementById('finished').innerHTML =
        '<div style="font-size:20px;">' +
            'Responses saved, thank you for your participation!<br>' +
            'You can now close this page.' +
        '</div>';
    } catch (err) {
      console.error(err);
      alert('Saving failed.  Please copy this message to the experimenter:\n' +
            err.message);
    }
  }