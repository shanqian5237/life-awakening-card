const CARD_TOTAL = 54;
const CARD_FOLDER = "牌样";
const CARD_BACK = `${CARD_FOLDER}/cardback.jpg`;
const ACCESS_STORAGE_KEY = "evergreen-life-card-access";
const SUPABASE_URL = "https://dxasdpflxkjljkssuyhi.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR4YXNkcGZseGtqbGprc3N1eWhpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAxMjgzNDQsImV4cCI6MjA5NTcwNDM0NH0.ddFtv4RAZ9fSU7R4nrSewyeSw4qPdbpFo_R4TK7wCb0";

const cardData = [
  { keyword: "母亲不是牺牲", guidance: "成为母亲不是失去自我，而是进入生命新的成长阶段。很多女性会把“母亲”理解成牺牲，这张卡是在提醒：母亲也可以继续发光。" },
  { keyword: "新生命降临", guidance: "每一个生命的到来，都会带来新的成长与人生礼物。" },
  { keyword: "身体在创造生命", guidance: "身体拥有深层智慧，正在安静孕育新的生命。" },
  { keyword: "孩子选择了你", guidance: "孩子与父母之间，存在深层而独特的生命连接。" },
  { keyword: "生命在体内成长", guidance: "成长很多时候是在安静中发生的，不需要着急。" },
  { keyword: "你正在成为母亲", guidance: "成为母亲是一场身份与生命的转化。" },
  { keyword: "身份升级", guidance: "每一个人生阶段都意味着新的责任与成长。" },
  { keyword: "无限的爱", guidance: "爱是一种流动的生命能量。" },
  { keyword: "生命之门", guidance: "生命来到世界，是一次新的开始。" },
  { keyword: "情绪在说话", guidance: "情绪是内心真实感受与需求的表达。" },
  { keyword: "焦虑的信号", guidance: "焦虑往往来自未知与失控感。" },
  { keyword: "允许不完美", guidance: "真正的成长来自真实，而非完美。" },
  { keyword: "情绪需要被看见", guidance: "被压抑的情绪，往往会以更强烈方式出现。" },
  { keyword: "给自己温柔", guidance: "温柔对待自己，也是一种力量。" },
  { keyword: "情绪会流动", guidance: "情绪像水一样，会流动与离开。" },
  { keyword: "放下担心", guidance: "过度担忧会消耗生命能量。" },
  { keyword: "安全感来自内心", guidance: "真正稳定的安全感来自内在。" },
  { keyword: "身体知道答案", guidance: "身体往往比头脑更早感知真实。" },
  { keyword: "身体知道答案", guidance: "身体往往比头脑更早感知真实。" },
  { keyword: "呼吸", guidance: "呼吸能够连接身体与情绪。" },
  { keyword: "节奏", guidance: "每个人都有属于自己的生命节奏。" },
  { keyword: "休息", guidance: "真正的休息，是让身体重新恢复能量。" },
  { keyword: "能量流动", guidance: "当身体放松，生命力会重新流动。" },
  { keyword: "信任身体", guidance: "身体拥有天然的修复与疗愈能力。" },
  { keyword: "放松", guidance: "放慢下来，内心会重新稳定。" },
  { keyword: "温柔照顾", guidance: "温柔照顾身体，也是在照顾自己。" },
  { keyword: "身体的智慧", guidance: "身体记录着生命经验与真实感受。" },
  { keyword: "我不是我的母亲", guidance: "原生家庭会影响我们，但不决定我们。" },
  { keyword: "家族在流动", guidance: "家庭模式会在代际间延续。" },
  { keyword: "觉察而不是重复", guidance: "觉察是停止重复家庭模式的开始。" },
  { keyword: "我可以重新选择", guidance: "即使过去无法改变，未来依然可以重新选择。" },
  { keyword: "停止代际传递", guidance: "当一个人开始成长，旧模式可以停止。" },
  { keyword: "父亲的影响", guidance: "与父亲的关系会影响安全感与亲密关系。" },
  { keyword: "母亲的影响", guidance: "母亲会深刻影响我们的情感模式。" },
  { keyword: "家庭中的角色", guidance: "每个人都会在家庭中承担某种角色。" },
  { keyword: "我为自己而活", guidance: "真正成长，是活出属于自己的人生。" },
  { keyword: "钱不是焦虑的源头", guidance: "真正让人不安的，往往是失控感。" },
  { keyword: "我可以被支持", guidance: "接受帮助也是一种力量。" },
  { keyword: "生活会重组", guidance: "人生阶段变化，会带来新的秩序。" },
  { keyword: "我不需要完美准备", guidance: "不完美，也可以开始新的阶段。" },
  { keyword: "丰盛可以流动", guidance: "当内心放松，资源会重新流动。" },
  { keyword: "工作与母亲可以共存", guidance: "事业与家庭并不是对立关系。" },
  { keyword: "我可以重新规划人生", guidance: "人生进入新阶段后，可以重新设计未来。" },
  { keyword: "我允许自己依赖", guidance: "适度依赖别人，也是一种成熟。" },
  { keyword: "我值得被照顾", guidance: "在照顾别人时，也别忘记照顾自己。" },
  { keyword: "感恩", guidance: "感恩能够帮助我们看见生命中的光。" },
  { keyword: "接纳", guidance: "接纳不是放弃，而是理解生命。" },
  { keyword: "平衡", guidance: "真正的成长来自内外平衡。" },
  { keyword: "生命循环", guidance: "每个阶段都包含成长意义。" },
  { keyword: "宽恕", guidance: "宽恕，是让自己从过去中释放。" },
  { keyword: "平静", guidance: "平静来自内在稳定，而非外界完美。" },
  { keyword: "完整", guidance: "完整意味着接纳自己的全部。" },
  { keyword: "智慧", guidance: "经历最终会沉淀为生命智慧。" },
  { keyword: "生命祝福", guidance: "所有经历最终都会成为成长礼物。" },
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
    return window.sessionStorage.getItem(ACCESS_STORAGE_KEY) === "granted";
  } catch (error) {
    return false;
  }
}

async function verifyAccessCode(inputCode) {
  const response = await fetch(`${SUPABASE_URL}/rest/v1/rpc/verify_access_code`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
    },
    body: JSON.stringify({
      input_code: inputCode,
      input_user_agent: navigator.userAgent,
    }),
  });

  if (!response.ok) {
    throw new Error("access_check_failed");
  }

  return response.json();
}

function accessErrorMessage(reason) {
  const messages = {
    not_found: "访问码不存在，请确认后再输入。",
    disabled: "这个访问码已停用，请联系工作人员。",
    expired: "这个访问码已到期，请联系工作人员。",
    usage_limit: "这个访问码已超过使用次数，请联系工作人员。",
  };

  return messages[reason] || "访问码验证失败，请稍后再试。";
}

async function checkAccess(event) {
  event.preventDefault();
  const inputCode = accessCode.value.trim().toUpperCase();

  if (!inputCode) {
    accessError.textContent = "请输入访问码。";
    return;
  }

  accessError.textContent = "正在验证访问码...";
  accessForm.querySelector("button").disabled = true;

  try {
    const result = await verifyAccessCode(inputCode);

    if (!result.ok) {
      accessError.textContent = accessErrorMessage(result.reason);
      accessCode.select();
      return;
    }

    unlockAccess();
    try {
      window.sessionStorage.setItem(ACCESS_STORAGE_KEY, "granted");
    } catch (error) {
      // Some local file previews block storage. Access still works for this visit.
    }
  } catch (error) {
    accessError.textContent = "暂时无法验证访问码，请检查网络后再试。";
  } finally {
    accessForm.querySelector("button").disabled = false;
  }
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
  const guidance = cardData[cardIndex - 1].guidance;
  if (guidance) return guidance;

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
