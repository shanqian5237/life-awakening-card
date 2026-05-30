const CARD_TOTAL = 54;
const CARD_FOLDER = "牌样";
const CARD_BACK = `${CARD_FOLDER}/cardback.jpg`;
const ACCESS_CODE = "CQ2026";
const ACCESS_STORAGE_KEY = "evergreen-life-card-access";

const cardData = [
  { keyword: "觉察" },
  { keyword: "接纳" },
  { keyword: "允许" },
  { keyword: "边界" },
  { keyword: "信任" },
  { keyword: "行动" },
  { keyword: "安住" },
  { keyword: "清理" },
  { keyword: "松绑" },
  { keyword: "选择" },
  { keyword: "回归" },
  { keyword: "滋养" },
  { keyword: "勇气" },
  { keyword: "温柔" },
  { keyword: "真实" },
  { keyword: "看见" },
  { keyword: "臣服" },
  { keyword: "生长" },
  { keyword: "敞开" },
  { keyword: "连接" },
  { keyword: "整合" },
  { keyword: "释放" },
  { keyword: "稳定" },
  { keyword: "重启" },
  { keyword: "内在力量" },
  { keyword: "丰盛" },
  { keyword: "流动" },
  { keyword: "疗愈" },
  { keyword: "转化" },
  { keyword: "耐心" },
  { keyword: "守护" },
  { keyword: "觉醒" },
  { keyword: "扎根" },
  { keyword: "呼吸" },
  { keyword: "创造" },
  { keyword: "平衡" },
  { keyword: "明晰" },
  { keyword: "休息" },
  { keyword: "承诺" },
  { keyword: "慈悲" },
  { keyword: "更新" },
  { keyword: "自爱" },
  { keyword: "倾听" },
  { keyword: "蜕变" },
  { keyword: "秩序" },
  { keyword: "宽恕" },
  { keyword: "专注" },
  { keyword: "丰盈" },
  { keyword: "领受" },
  { keyword: "自在" },
  { keyword: "穿越" },
  { keyword: "圆满" },
  { keyword: "希望" },
  { keyword: "新生" },
];

const guidanceTemplates = [
  "此刻，请把注意力轻轻带回自己。{keyword}不是要求你立刻改变什么，而是邀请你诚实地看见当下正在发生的一切。当你愿意这样陪伴自己，答案会从更安静、更清明的地方浮现。",
  "今天的提醒是{keyword}。请允许自己慢一点，不急着证明，也不急着抵达。你已经拥有穿过当下的力量，只需要把脚步放回真实，把心交还给生命本身。",
  "{keyword}正在靠近你。它提醒你照顾内在最柔软的部分，也相信自己可以做出清醒的选择。愿你在今天，带着温柔与力量，走向更适合自己的方向。",
  "当你抽到{keyword}，生命正在提醒你：真正的成长常常从一个微小的转身开始。请把这张卡当作一束光，照见你此刻最需要被理解、被支持、被唤醒的地方。",
];

const homeScreen = document.getElementById("homeScreen");
const accessScreen = document.getElementById("accessScreen");
const accessForm = document.getElementById("accessForm");
const accessCode = document.getElementById("accessCode");
const accessError = document.getElementById("accessError");
const resultScreen = document.getElementById("resultScreen");
const cardStage = document.getElementById("cardStage");
const homeCard = document.getElementById("homeCard");
const drawButton = document.getElementById("drawButton");
const resultImage = document.getElementById("resultImage");
const cardNumber = document.getElementById("cardNumber");
const keywordTitle = document.getElementById("keywordTitle");
const guidanceText = document.getElementById("guidanceText");
const resetButton = document.getElementById("resetButton");

let currentCard = null;

function unlockAccess() {
  accessScreen.classList.remove("is-active");
  homeScreen.classList.add("is-active");
  accessError.textContent = "";
}

function hasAccess() {
  try {
    return window.localStorage.getItem(ACCESS_STORAGE_KEY) === "granted";
  } catch (error) {
    return false;
  }
}

function checkAccess(event) {
  event.preventDefault();
  const inputCode = accessCode.value.trim().toUpperCase();

  if (inputCode === ACCESS_CODE) {
    unlockAccess();
    try {
      window.localStorage.setItem(ACCESS_STORAGE_KEY, "granted");
    } catch (error) {
      // Some local file previews block storage. Access still works for this visit.
    }
    return;
  }

  accessError.textContent = "访问码不正确，请确认后再输入。";
  accessCode.select();
}

function cardPath(cardIndex) {
  return `${CARD_FOLDER}/card${String(cardIndex).padStart(2, "0")}.jpg`;
}

function randomCardIndex() {
  const array = new Uint32Array(1);

  if (window.crypto && window.crypto.getRandomValues) {
    const max = Math.floor(0x100000000 / CARD_TOTAL) * CARD_TOTAL;

    do {
      window.crypto.getRandomValues(array);
    } while (array[0] >= max);

    return (array[0] % CARD_TOTAL) + 1;
  }

  return Math.floor(Math.random() * CARD_TOTAL) + 1;
}

function guidanceFor(cardIndex, keyword) {
  const template = guidanceTemplates[(cardIndex - 1) % guidanceTemplates.length];
  return template.replaceAll("{keyword}", keyword);
}

function showResult(cardIndex) {
  const data = cardData[cardIndex - 1];
  const keyword = data.keyword;
  const imagePath = cardPath(cardIndex);

  currentCard = { index: cardIndex, imagePath, keyword };
  resultImage.src = imagePath;
  resultImage.alt = `第 ${cardIndex} 张生命觉醒卡`;
  cardNumber.textContent = `今日觉醒卡：第 ${cardIndex} 张`;
  keywordTitle.textContent = `关键词：${keyword}`;
  guidanceText.textContent = guidanceFor(cardIndex, keyword);

  homeScreen.classList.remove("is-active");
  resultScreen.classList.add("is-active");
}

function startDraw() {
  drawButton.disabled = true;
  drawButton.textContent = "正在抽卡";
  homeCard.src = CARD_BACK;
  cardStage.classList.add("is-shuffling");

  window.setTimeout(() => {
    const cardIndex = randomCardIndex();
    cardStage.classList.remove("is-shuffling");
    drawButton.disabled = false;
    drawButton.textContent = "开始抽卡";
    showResult(cardIndex);
  }, 1500);
}

function resetDraw() {
  currentCard = null;
  resultScreen.classList.remove("is-active");
  homeScreen.classList.add("is-active");
  homeCard.src = CARD_BACK;
}

drawButton.addEventListener("click", startDraw);
resetButton.addEventListener("click", resetDraw);
accessForm.addEventListener("submit", checkAccess);
document.addEventListener("contextmenu", (event) => {
  if (event.target.closest(".card-stage, .result-card-wrap")) {
    event.preventDefault();
  }
});
document.addEventListener("dragstart", (event) => {
  if (event.target.closest(".card-image, .result-card-image")) {
    event.preventDefault();
  }
});

if (hasAccess()) {
  unlockAccess();
}
