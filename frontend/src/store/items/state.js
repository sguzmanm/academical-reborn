import {ItemTypes} from "../../util/items/items";
//import Courses from "../../assets/data/my-courses.json";

const Courses=[
  {"title":"ANTR-1106:PENSAMIENTO INDIGENA Y AFROCOLOMBIANO","code":"38803","credits":"3","limit":"47","enrolled":"0","term":"202010","type":"PERIODO COMPLETO","campus":"CAMPUS PRINCIPAL","description":{"name":"AGUIRRE LISCHT DANIEL GUILLERMO","ind":"Y"},"place":"- -:- -","dateStart":"2020-01-20T14:30:00.000Z","dateEnd":"2020-05-23T15:50:00.000Z","timeStart":"09:30","timeEnd":"10:50","indexStart":7,"indexEnd":9,"days":[1,3],"_id":"38803-0D1-3-"}
];

const initState={};
initState[ItemTypes.EVENT]=[];
initState[ItemTypes.COURSE]=Courses;

export default initState;
