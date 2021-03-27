const numDivs = 36;
const maxHits = 10;

let hits = 0;
let firstHitTime = 0;

let score = 0;

function round() {
  // FIXME: надо бы убрать "target" прежде чем искать новый
  $('.game-field').removeClass('target');
  $('.game-field').text('');

  // TODO: удалить красные квадраты
  $('.game-field').removeClass('miss');

  let divSelector = randomDivId();
  $(divSelector).addClass('target');
  // TODO: помечать target текущим номером
  $(divSelector).text(hits+1);
  // FIXME: тут надо определять firstHitTime при клике на первый target 
  $(divSelector).click(function() {
    if ($(divSelector).text() === '1') {
      firstHitTime = getTimestamp();
      console.log(firstHitTime)};
  });

  if (hits === maxHits) {
    endGame();
  };
}

function endGame() {
  // FIXME: спрятать игровое поле сначала
  $('.game-field').addClass('hidden');

  let totalPlayedMillis = getTimestamp() - firstHitTime;
  let totalPlayedSeconds = Number(totalPlayedMillis / 1000).toPrecision(3);
  $('#total-time-played').text(totalPlayedSeconds);

  //Вывод счета за игру
  $('#total-score').text(hits-score);

  $('#win-message').removeClass('d-none');
}

function handleClick(event) {
  // FIXME: убирать текст со старых таргетов. Кажется есть .text?
  if ($(event.target).hasClass('target')) {
    hits = hits + 1;
    round();
  }
  // TODO: как-то отмечать если мы промахнулись? См CSS класс .miss
  else {
    if ($('.game-field').hasClass('miss')) {
      $('.miss').text('');
      $('.game-field').removeClass('miss');
    }
    $(event.target).addClass('miss');
    score = score + 1;
    $(event.target).text('-1');
  }
}

function init() {
  // TODO: заказчик просил отдельную кнопку, запускающую игру а не просто по загрузке
  round();

  $('.game-field').click(handleClick);
  $('#button-reload').click(function() {
    location.reload();
  });
}

$(document).ready(init);
