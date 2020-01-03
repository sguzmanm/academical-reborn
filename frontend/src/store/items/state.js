import {ItemTypes} from "../../util/items/items";
import Courses from "../../assets/data/my-courses.json";

const initState={};
initState[ItemTypes.EVENT]=[];
initState[ItemTypes.COURSE]=Courses;

export default initState;
