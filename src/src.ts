// ./src/src.ts
export{};

const allProjects = [
    "https://github.com/Lucchese-Anthony/Tic-Tac-Toe",
    "https://github.com/Lucchese-Anthony/Lucchese-Anthony.github.io/tree/main/Search-Algorithms",
    "https://github.com/Lucchese-Anthony/Password-Manager", 
    "https://github.com/Lucchese-Anthony/process-scheduler",
    "https://github.com/Lucchese-Anthony/Peirces-Law",
    "https://github.com/Lucchese-Anthony/MonteCarloSimulation",
    "https://github.com/Lucchese-Anthony/BruteForcePasswordCracker",
    "https://github.com/Lucchese-Anthony/TipCalculatorApp",
    "https://github.com/Lucchese-Anthony/Euclidean-Algorithm",
    "https://github.com/Lucchese-Anthony/Tag-System",
    "https://github.com/Lucchese-Anthony/Super-Bowl-Pool-Numbers",
    "https://github.com/Lucchese-Anthony/Game-Of-Life-Processing"
];

const math_courses =[
    "Chaos and Fractals",
    "Probability",
    "Cryptography",
    "Coding Theory",
    "Applied Combinatorics",
    "Linear Algebra",
    "Calculus III",
    "Introduction to Mathematical Proofs",
    "Calculus II ",
    "Calculus I",
    "Discrete Structures"
]

const main_classes = [
    "Mobile Application Development",
    "Web Programming",
    "Real-Time Systems",
    "Artificial Intelligence",
    "Operating Systems",
    "Fundamentals of Software Engineering",
    "Capstone Project"
]
const Intro_classes = [
    "Computer Science I",
    "Computer Science II",
    "Data Structures and Algorithms",
    "Machine Organization and Assembly Language Programming",
    "Theoretical Foundations of Computer Science"
]

function outputAllProjects() { 
    for(let i = 0; i < allProjects.length; i++) {
        document.write("<h2>")
        var split = allProjects[i].split("/").slice(3)[1];
        var name = "Lucchese-Anthony";
        var url = `https://raw.githubusercontent.com/${name}/${split}/main/README.md`;
        if (i == 1) {
            url = "https://raw.githubusercontent.com/Lucchese-Anthony/Lucchese-Anthony.github.io/main/Search-Algorithms/README.md"
            split = "Search-Algorithms";
        }
        document.write(`<a href= "${allProjects[i]}" class="subsections">${split}</a>`)
        document.write("</h2>")
        document.write(`<p id='p${i}'>`)
        var readMe: string;
        fetch(url).then(function(response) {
            response.text()
            .then(function(text) {
                readMe = text;
                done();
            });
        });

        function done() {
            document.getElementById(`p${i}`).innerHTML += readMe;
        }
        document.write("</p>")
    }
}

function outputAllClasses() {
    document.write("<h2>Math Courses - Double Major</h2>")
    for(let i = 0; i < math_courses.length; i++) {
        document.write(`<p>• ${math_courses[i]}</p>`);
    }
    document.write("<h2>Junior/Senior CS Courses</h2>")
    for(let i = 0; i < main_classes.length; i++) {
        document.write(`<p>• ${main_classes[i]}</p>`);
    }
    document.write("<h2>Intro CS Courses</h2>")
    for(let i = 0; i < Intro_classes.length; i++) {
        document.write(`<p>• ${Intro_classes[i]}</p>`);
    }
}