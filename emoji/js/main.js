const picker = document.querySelector('.emoji-picker');
const message = document.querySelector('.message');
const url = 'https://badoocdn.com/big/chat/emoji/{code}.png';
const url2 = 'https://badoocdn.com/big/chat/emoji@x2/{code}.png';
const tpl = '<img class="emoji emoji--{code} js-smile-insert" src="{src}" srcset="{src} 1x, {src_x2} 2x" unselectable="on"/>';

const EMOJI_DATA = [
    {
        title: 'People',
        icons: ['😃', '😁', '😅', '😇', '😍', '🤡', '🤠', '😎', '😡', '😨', '😭']
    },
    {
        title: 'Cats',
        icons: ['😺', '😸', '😹', '😻', '😼', '😽', '🙀', '😿', '😾']
    },
    {
        title: 'Jestures',
        icons: ['👍', '👎', '👊', '✊', '✌️', '🤘']
    }
];

const addIcon = icon => {
    message.innerHTML += buildImgFromEmoji(icon);
};

const renderEmojiList = icons =>
    icons.map(icon =>
        `<li onclick="addIcon('${icon}')">${icon}</li>`
    ).join('');

const renderIconsGroup = group =>
    `   <section>
          <h2>${group.title}</h2>
          <ul>
            ${renderEmojiList(group.icons)}
          </ul>
        </section>
    `;

const renderIcons = emojiData => emojiData.map(group => renderIconsGroup(group)).join('');

const buildImgFromEmoji = emoji => {
    const codePoint = emoji.codePointAt(0).toString(16);

    return $tpl(tpl, {
        code: codePoint,
        src: $tpl(url, {
            code: codePoint
        }),
        src_x2: $tpl(url2, {
            code: codePoint
        })
    });
};

function $tpl(tpl, placeholderVars) {
    Object.keys(placeholderVars).forEach(key => {
        tpl = tpl.replace(`{${key}}`, placeholderVars[key]);
    });

    return tpl;
}

picker.innerHTML = renderIcons(EMOJI_DATA);
