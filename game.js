//get html

const wrap = document.getElementById('wrap');
const start = document.getElementById('start');

const textLists = [
    'Hello World','This is my App','How are you?',
  'Today is sunny','I love JavaScript!','Good morning',
  'I am Japanese','Let it be','Samurai',
  'Typing Game','Information Technology',
  'I want to be a programmer','What day is today?',
  'I want to build a web app','Nice to meet you',
  'Chrome Firefox Edge Safari','machine learning',
  'Brendan Eich','John Resig','React Vue Angular',
  'Netscape Communications','undefined null NaN',
  'Thank you very much','Google Apple Facebook Amazon',
  'ECMAScript','console.log','for while if switch',
  'var let const','Windows Mac Linux iOS Android',
  'programming'
    
    ]; //text
    
let checkTexts = [];

const createText = () => {
    const p = document.getElementById('text');
    //random 
    const rnd = Math.floor(Math.random() * textLists.length);
    
    //p clean
    p.textContent = '';
    
    checkTexts = textLists[rnd].split('').map(value => {
        //span create
        const span = document.createElement('span');
        //span split
        span.textContent = value;
        
        //span => p
        p.appendChild(span);
        return span;
    })
    
}; //random text

let score = 0;

const keyDown = e => {
    if(e.key === checkTexts[0].textContent){
        // add-color
        checkTexts[0].className = 'add-color';
        
        // delete 1word
        checkTexts.shift();
        
        //good tp score ++
        score++;
        
        //clear, and new text
        if(!checkTexts.length)createText();
    } 
    // Shiftキーを押した時は色が変わらない
   else if(e.key === 'Shift') {
    wrap.style.backgroundColor = '#666';

  // タイプミスした時だけ背景色を赤色に変える
  } else {
    wrap.style.backgroundColor = 'red';
  }
    
}; //key event &

const rankCheck = score => {
    let text ='';
    //score => text if?
    if(score<100){
         text = `あなたのランクはCです。\nBランクまであと${100 - score}文字です。`;
   } else if(score < 200) {
     text = `あなたのランクはBです。\nAランクまであと${200 - score}文字です。`;    
   } else if(score < 300) {
     text = `あなたのランクはAです。\nSランクまであと${300 - score}文字です。`;    
   } else if(score >= 300) {
     text = `あなたのランクはSです。\nおめでとうございます！`;    
   }
    return `${score}文字打てました\n${text}\n【OK】リトライ／【キャンセル】終了`;
}; //rank & message

const gameOver = id => {
    //timer stoped
    clearInterval(id)
    const result = confirm(rankCheck(score));
      // OKボタンをクリックされたらリロードする
  if(result) window.location.reload();
}; 

const timer = () => {
    //timer default =60sec
    let time = 60;
    
    const count = document.getElementById('count');
    const id = setInterval(() =>{
        //count timer 0 => stop
        if(time <= 0) gameOver(id);
        //1second
        count.textContent = time--;
        
    },1000);
};

start.addEventListener('click', () => {
    timer();
    createText();
    //start 非表示
    start.style.display = 'none';
    //keyborad event
    document.addEventListener('keydown', keyDown);
});