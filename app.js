
const btnGet=document.getElementById("btnGet");
let choices=""
let answer="";

const genres=[
    {
        name:"General Knowledge",
        id:9
    },
    {
        name:"History",
        id:23
    },
    {
        name:"Music",
        id:12
    },
    {
        name:"Video Games",
        id:15
    },
    {
        name:"Fillm",
        id:11
    },
    {
        name:"Science/Nature",
        id:17
    },
    {
        name:"Science/Computers",
        id:18
    },
    {
        name:"Sports",
        id:21
    },
    {
        name:"Geography",
        id:22
    },
    {
        name:"Cartoon&Animations",
        id:32
    },
    {
        name:"Celebrities",
        id:26
    }
]

btnGet.addEventListener('click', function(){
    const genre=document.getElementById('genre').selectedIndex;
    const selectedId=genres[genre].id;
    fetch(`https://opentdb.com/api.php?amount=1&category=${selectedId}&type=multiple`)
    .then(
        function(response){
            if(response.status!==200){
                console.log('Looks like there was a problem. Status Code: ' + response.status);
                return;
            }
            const displayContainer=document.getElementById("display");
            displayContainer.classList.add("display");
            const categoryContainer=document.createElement('div');
            displayContainer.append(categoryContainer);
            categoryContainer.id="category";
            const questionContainer=document.createElement('div');
            displayContainer.append(questionContainer);
            questionContainer.id="question";
            const choicesContainer=document.createElement('div');
            displayContainer.append(choicesContainer);
            choicesContainer.id="choices";
            const answerContainer=document.createElement('div');
            displayContainer.append(answerContainer);
            answerContainer.id="answer";

            document.getElementById("choices").innerHTML="<button id='btnChoices'>Display Choices</button>"
            document.getElementById("answer").innerHTML="<button id='btnDisplayAnswer'>Display Aswer</button>"
            response.json().then(function(data){
                //console.log(data.results[0])
                answer=data.results[0].correct_answer;
                const question=data.results[0].question;
                const category=data.results[0].category;
                document.getElementById("category").innerHTML=category;
                document.getElementById("question").innerHTML=question;

                document.getElementById("btnChoices").addEventListener('click',function(){
                    btnChoices.classList.add('choiceBtn');
                const choiceCorrect=data.results[0].correct_answer;
                const choicesIncorrect=data.results[0].incorrect_answers;
                const arr=choicesIncorrect;
                arr.push(choiceCorrect)
                const newArr=[...arr];

                let currentIndex=newArr.length;
                while(currentIndex !=0){
                    randomIndex=Math.floor(Math.random()*currentIndex);
                    currentIndex--;
                    [newArr[currentIndex], newArr[randomIndex]] = [
                        newArr[randomIndex], newArr[currentIndex]];
                }
                for(let i=0; i<arr.length; i++){  
                    const list=document.createElement('li')
                    document.getElementById("choices").appendChild(list).innerHTML=newArr[i]
                } 
                })

                document.getElementById("btnDisplayAnswer").addEventListener('click',function(){
                    document.getElementById("answer").innerHTML=answer;
                });
            });
        }
    )
    .catch(function(err){
        console.log('Fetch Error :-S', err);
    });
});




