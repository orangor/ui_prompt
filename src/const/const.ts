const HEADE: any = [
  {
    name: 'prompt',
    link: '/draw_tag',
    list: [],
  },
  {
    name: 'content_info',
    link: '/content_info',
    list: [],
  },
  {
    name: 'hot_list',
    link: '/hot_list',
    list: [],
  },
  {
    name: '截图',
    link: '/screen_show',
    list: [],
  },
  {
    name: '统计',
    link: '/statistics',
    list: [],
  },
  /** 
    {
    name: "音乐",
    link: "/screencap",
    list: [ ]
    },
    {
    name: "搜索",
    link: "/selectmom",
    list: [
        {
            name: "React",
            url: "https://react.docschina.org/docs/hello-world.html"
        },
        {
            name: "Vue",
            url: "https://cn.vuejs.org/v2/guide/"
        },
        {
            name: "TS",
            url: "https://www.tslang.cn/docs/home.html"
        },
        { name: "Node", url: "http://nodejs.cn/api/" },
        { name: "Golange", url: "http://docscn.studygolang.com/doc/" },
        {
            name: 'JS', url: "https://developer.mozilla.org/zh-CN/docs/Web/API/HTML_Drag_and_Drop_API"
        }
        ,{
            name:"AntDesing",url:"https://ant.design/components/overview-cn/"
        },
        {
            name:"翻译",url:"https://fanyi.baidu.com/translate?aldtype=16047&query=&keyfrom=baidu&smartresult=dict&lang=auto2zh#auto/zh/"
        }

    ]
}
*/
]
import COLOR from '../json/color.json'
const GET_COLOR = function () {
  return COLOR.colors[Math.floor(Math.random() * COLOR.colors.length)]
}
const DANCE_KEY = {
  YES: 1,
  NO: 2,
}

interface CARD_CELL {
  name: string
  nth: number
  id: number
  card_id: string
  context: string
}
interface CARD_NODE {
  id: number
  name: string
  nth: number
  list: CARD_CELL[]
}

interface ROLL_BOX {
  w: number
  h: number
}
interface SONG_PICK {
  id: number
  text: string
  type: string
  label: string
}
interface TAG_NODE {
  id: number
  field: string
  type2: string
  label: string
  value: string
  type: string
}

const TAG_TYPE2: any = {
  First: ',',
  Second: '_',
  /*
third:
fourth
fifth
sixth
seventh
eighth
ninth*/
}
const TYPE_VALUE: any = {
  F1: 'first',
  F2: 'second',
}

interface PEOPRE_NOOE {
  head: {
    skin: string /*皮肤*/
    hair: string /*头发*/
    eyes: string /*眼睛*/
    lips: string /*唇*/
    nose: string /*鼻子*/
    ears: string /*耳朵*/
    hairstyle: string /*发型*/
  }
  trunk: {
    leg: string /*腿*/
    hand: string /*手*/
    chest: string /*胸*/
    clothes: string /*衣服*/
    pants: string /*裤子*/
    shoe: string /*鞋子*/
  }
}
interface CHECK_TAG {
  field: string
  data: TAG_NODE[]
}

type TEXT_NODE = {
  title: string
  type: string
}

type OrdinalsType = {
  [key: string]: TEXT_NODE
}
const ORDINALS: OrdinalsType = {
  FIRST: { title: '色1', type: 'text-container1' },
  SECOND: { title: '色2', type: 'text-container2' },
  THIRD: { title: '色3', type: 'text-container3' },
  FOURTH: { title: '色4', type: 'text-container4' },
  FIFTH: { title: '色5', type: 'text-container5' },
  SIXTH: { title: '色6', type: 'text-container6' },
  SEVENTH: { title: '色7', type: 'text-container7' },
  EIGHTH: { title: '色8', type: 'text-container8' },
  NINTH: { title: '色9', type: 'text-container9' },
  TENTH: { title: '色10', type: 'text-container10' },
}
const KEYS_ARRAY = Object.keys(ORDINALS).map((key) => [key])

interface MOM_TEXT {
  text_node: TEXT_NODE
  text: string
}

export {
  HEADE,
  GET_COLOR,
  DANCE_KEY,
  CARD_CELL,
  CARD_NODE,
  ROLL_BOX,
  SONG_PICK,
  TAG_NODE,
  CHECK_TAG,
  TAG_TYPE2,
  TYPE_VALUE,
  MOM_TEXT,
  ORDINALS,
  OrdinalsType,
  KEYS_ARRAY,
}
