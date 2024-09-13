
import {Screencap} from "../views/screencap/screencap"
import { HEADE}from"../const/const"
import {Selectmom} from "../views/selectmom/index"
import {DrawTag} from "../views/draw_tag/tag"
import {ContentInfoComponent} from  "../views/contentInfos/contentInfos"
import {Hotlist} from  "../views/hotList/hotList"
import{ScreenShow } from "../views/screenShow/screen_show"
import{GeometricMeanCalculator} from "../views/statistics/statistics"
interface router {
    path: string,
    component: any,
    children?: Array<router>
}

const routers: Array<router> = [   {
    path:"/",
    component:DrawTag
},{
    path:"/content_info",
    component:ContentInfoComponent
},
{
    path:"/draw_tag",
    component:DrawTag

},{
    path:"/hot_list",
    component:Hotlist

},{
    path:'/screen_show',
    component:ScreenShow

},{
    path:'/statistics',
    component:GeometricMeanCalculator

},

]

export { routers }
/*
    {
        path:"/",
        component:DrawTag
    },
    {
        path:"/draw_tag",
        component:DrawTag
    },
    /*
    {
        path:"/screencap",
        component:Screencap
    },
  
    {
        path:"/selectmom",
        component:Selectmom
    }*/