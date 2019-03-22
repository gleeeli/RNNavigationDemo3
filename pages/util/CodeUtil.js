
import md5 from "react-native-md5";


let CodeUtil = {
    getMd5(str) {
        let hex_md5v = md5.hex_md5('123456');
        // console.log(">>>>hex_md5:", hex_md5v);
        return hex_md5v;
    }
}    
export default CodeUtil;
