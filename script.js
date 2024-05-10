

let schoolData = [];

const subjectColors = {
    "Common Core Algebra": "#FF5733",
    "Geometry": "#FFD700",
    "English": "#007BFF",
    "Physical Settings/Chemistry": "#28A745",
    "Physical Settings/Earth Science": "#6610F2",
    "Living Environment": "#FFC107",
    "U.S. History and Government": "#DC3545",
    "Global History and Geography": "#17A2B8"
};

function preload() {
    let url = "https://data.cityofnewyork.us/resource/bnea-fu3k.json?$query=SELECT%20school_name%2C%20regents_exam%2C%20year%2C%20category%2C%20total_tested%2C%20mean_score%2C%20number_scoring_below_65%2C%20number_scoring_65_or_above%2C%20number_scoring_80_or_above%2C%20number_scoring_cr%20WHERE%20%60year%60%20IN%20(%272015%27)%20AND%20(regents_exam%20IN%20(%27Common%20Core%20Algebra%27,%20%27Geometry%27,%20%27English%27,%20%27Physical%20Settings/Chemistry%27,%20%27Physical%20Settings/Earth%20Science%27,%20%27Living%20Environment%27,%20%27U.S.%20History%20and%20Government%27,%20%27Global%20History%20and%20Geography%27)) AND NOT school_name='Stevenson Yabe'";
    loadJSON(url, function(data) {
        schoolData = data;
        createSchoolList();
    });
}

function setup() {
    createCanvas(windowWidth - 200, windowHeight);
    noLoop();
}

function createSchoolList() {
    let nav = document.getElementById('nav');
    let schools = new Set(schoolData.map(data => data.school_name));
    schools.forEach(school => {
        let schoolHeader = document.createElement('h3');
        schoolHeader.textContent = school;
        schoolHeader.onclick = function() {
            selectSchool(schoolHeader, school);
        };

        let filterDropdown = document.createElement('select');
        filterDropdown.innerHTML = `
            <option value="mean_score">Mean Score</option>
            <option value="number_scoring_below_65">Number Scoring Below 65</option>
            <option value="number_scoring_80_or_above">Number Scoring Above 80</option>
        `;
        filterDropdown.onchange = function() {
            selectSchool(schoolHeader, school, filterDropdown.value);
        };

        nav.appendChild(schoolHeader);
        nav.appendChild(filterDropdown);
    });
}

function selectSchool(selectedHeader, school, filter = "mean_score") {
  
    let allSchoolHeaders = document.querySelectorAll('h3');
    allSchoolHeaders.forEach(header => {
        header.classList.remove('selected-school');
    });
    
    // Add the 'selected-school' class to the selected school header
    selectedHeader.classList.add('selected-school');

    const filteredData = schoolData.filter(data => data.school_name === school);
    drawScores(filteredData, filter);
}



function drawScores(filteredData, filter) {
    clear(); 
    let xPos = 400; 
    let geometryY = 220;
    let englishY = 220;
    let livingEnvironmentY = 220;
    let earthScienceY = 220;
    let drawnCircles = [];

    if (windowWidth <= 600) {
        xPos = 100; 
    }

    filteredData.forEach((data, index) => {
        if (data.mean_score !== 's') {
            let y = height / 2;
            if (data.regents_exam === "Geometry") {
                y = geometryY;
            } else if (data.regents_exam === "English") {
                y = englishY;
            } else if (data.regents_exam === "Living Environment") {
                y = livingEnvironmentY;
            } else if (data.regents_exam === "Physical Settings/Earth Science") {
                y = earthScienceY;
            }
            let value;
            let totalTested = parseInt(data.total_tested); 
            if (filter === "mean_score") {
                value = parseFloat(data.mean_score);
            } else if (filter === "number_scoring_below_65") {
                value = parseFloat(data.number_scoring_below_65);
            } else if (filter === "number_scoring_80_or_above") {
                value = parseFloat(data.number_scoring_80_or_above);
            }
            let diameter = value * 2.5;
            let color = subjectColors[data.regents_exam] || "gray";

            let adjustedX = xPos;
            let adjustedY = y;
            let collision = false;
            for (let i = 0; i < drawnCircles.length; i++) {
                let otherCircle = drawnCircles[i];
                let distance = dist(adjustedX, adjustedY, otherCircle.x, otherCircle.y);
                if (distance < (diameter / 2 + otherCircle.diameter / 2)) {
                    collision = true;
                    adjustedX += diameter;
                }
            }

            if (!collision) {
                fill(color);
                ellipse(adjustedX, adjustedY, diameter, diameter);
                
               
                fill(0);

                textSize(20);
                textAlign(CENTER, CENTER);

                let textX = adjustedX; 
                let textY = adjustedY - diameter / 5.5; 
                

               
                let subjectText;
                switch (data.regents_exam) {
                    case "Common Core Algebra":
                        subjectText = "Algebra";
                        break;
                    case "Global History and Geography":
                        subjectText = "Global History";
                        break;
                    case "Physical Settings/Chemistry":
                        subjectText = "Chemistry";
                        break;
                    case "Physical Settings/Earth Science":
                        subjectText = "Earth Science";
                        break;
                    case "U.S. History and Government":
                        subjectText = "U.S. History";
                        break;
                    default:
                        subjectText = data.regents_exam;
                }

                text(subjectText, textX, textY); 
                text(value, textX, textY + 50); 
                textSize(14); 
                text("Total Tested: " + totalTested, textX, textY + 80); 

                drawnCircles.push({
                    x: adjustedX,
                    y: adjustedY,
                    diameter: diameter
                });
            }

            xPos += 100; 
        }
    });
}






document.addEventListener("DOMContentLoaded", function() {
   
    setTimeout(function() {
        let regentsImg = document.getElementById("regents");
        regentsImg.classList.add("slide-in");
    }, 500); 
});



document.addEventListener("DOMContentLoaded", function() {
   
    document.getElementById("moveLeftButton").addEventListener("click", function() {
      
        let deskImg = document.querySelector(".img1");
       
        deskImg.style.left = "-100%"; 

       
        let regentsImg = document.getElementById("regents");
       
        regentsImg.style.left = "-100%"; 
    });
});

document.addEventListener("DOMContentLoaded", function() {

    document.getElementById("moveLeftButton").addEventListener("click", function() {
    
        let deskImg = document.querySelector(".img1");
     
        deskImg.style.left = "-100%"; 

     
        let regentsImg = document.getElementById("regents");
     
        regentsImg.style.left = "-100%"; 

        
        this.style.display = "none";
    });
});






