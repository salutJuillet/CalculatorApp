import React, {useState} from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
// import calculator from '../util/caculotor';
import Button from './Buttons';



const Caculator = () => {
    
    const [darkmode, setDarkmode] = useState(false);

    const initialState = {
        currentValue: "0",
        operator: null,
        previousValue: null
    };
    const [base, setBase] = useState({...initialState});
    
    /* 버튼을 눌렀을 때 */
    const handleTap = (type, value) => {
        calculator(type, value, base); //함수에 base를 매개변수로 보낸다.
    }

    /**** 숫자를 탭했을 때 ****/
    const handleNumber = (value) => {
        if(base.currentValue === '0' || base.currentValue === ''){ 
            if(value === '.'){
                return setBase(() => {
                    let newBase = {...base};
                    newBase.currentValue = `0${value}`;
                    return newBase;
                })
            }
            return setBase(() => {
                let newBase = {...base};
                newBase.currentValue = `${value}`;
                // console.log(newBase);
                return newBase;
            })
            //초기상태에서 숫자를 눌렀을 때, 누른 숫자값을 반환
        }
        return setBase((base) => {
            let newBase = {...base};
            newBase.currentValue = `${base.currentValue}${value}`;
            return newBase;
        })
        //값을 탭할 때, 숫자 또는 연산자가 연속으로 입력되도록
    }

    /**** 연산자를 탭했을 때 ****/
    const handleOperator = (value, base) => {
        return setBase((base) => {
            let newBase = {...base};
            newBase.operator = value;
            newBase.previousValue = base.currentValue;
            newBase.currentValue = '';
            return newBase;
        })
    }

    /**** +/-를 탭했을 때 ****/
    const handlePosneg = (base) => {
        return setBase((base) => {
            let newBase = {...base};
            newBase.currentValue = `${parseFloat(base.currentValue) * -1}`;
            return newBase;
        })
    }

    /**** %를 탭했을 때 ****/
    const handlePercentage = (base) => {
        return setBase((base) => {
            let newBase = {...base};
            newBase.currentValue = `${parseFloat(base.currentValue) * 0.01}`;
            return newBase;
        })
    }    

    /**** equal을 탭했을 때 *****/
    const handleEqual = (base) => {
        // const {currentValue, previousValue, operator} = base;
        const current = parseFloat(base.currentValue); //문자열을 숫자로 변환
        const previous = parseFloat(base.previousValue);
        
        switch(base.operator){
            case '/' :
                return setBase(() => {
                    let newBase = {...base};
                    newBase.currentValue = previous / current;
                    newBase.previousValue = null;
                    newBase.operator = null;
                    return newBase;
                })
            case '*' :
                return setBase(() => {
                    let newBase = {...base};
                    newBase.currentValue = previous * current;
                    newBase.previousValue = null;
                    newBase.operator = null;
                    return newBase;
                })
            case '-' :
                return setBase(() => {
                    let newBase = {...base};
                    newBase.currentValue = previous - current;
                    newBase.previousValue = null;
                    newBase.operator = null;
                    return newBase;
                })
            case '+' :
                return setBase(() => {
                    let newBase = {...base};
                    newBase.currentValue = previous + current;
                    newBase.previousValue = null;
                    newBase.operator = null;
                    return newBase;
                })
            default: return base;
        }
    }

    /**** delete를 탭했을 때 ****/
    const handleDelete = (base) => {
        return setBase((base) => {
            let newBase = {...base};
            newBase.currentValue = base.currentValue.slice(0,-1);
            return newBase;
        })
    }

    


    /**** calculotor *****/
    const calculator = (type, value, base) => {
        switch (type) {
            case "number":
                return handleNumber(value, base);
            case "operator":
                return handleOperator(value, base);
            case "posneg":
                return handlePosneg(base);
            case "percentage":
                return handlePercentage(base);
            case "equal":
                return handleEqual(base);
            case "clear":
                return setBase({...initialState});
            case "delete":
                return handleDelete(base);
            default:
                return base;
        }
    };


  return (
    <View style={darkmode ? st.containerDark : st.container}>
        <View style={st.displayContainer}>
            {/* <Text style={st.formula}>
                {base.previousValue}{base.operator}{base.currentValue}
            </Text> */}
            <Text style={st.result}>
                {/* {parseFloat(base.currentValue).toLocaleString()} */}
                {base.currentValue}
            </Text>
        </View>

        <View style={darkmode ? st.seperatorDark : st.seperator} />

        <View style={st.buttonContainer}>
            <View style={st.column}>
                <Button title="C"
                        type="clear"
                        onPress={()=> handleTap('clear')}
                        darkmode={darkmode} />
                <Button
                    title="+/-"
                    type="posneg"
                    onPress={() => handleTap("posneg", "+/-")}
                    darkmode={darkmode}
                />
                <Button
                    title="%"
                    type="percentage"
                    onPress={() => handleTap("percentage", "%")}
                    darkmode={darkmode}
                />
                <Button title="del"
                        type="delete"
                        onPress={()=> handleTap('delete')}
                        darkmode={darkmode} />
                
            </View>

            
            <View style={st.column}>
                <Button title="7" 
                        type="number"
                        onPress={() => handleTap("number", 7)}
                        darkmode={darkmode} />
                <Button title="8"
                        type="number"
                        onPress={() => handleTap("number", 8)}
                        darkmode={darkmode} />
                <Button title="9"
                        type="number" 
                        onPress={() => handleTap("number", 9)}
                        darkmode={darkmode} />
                <Button
                    title="&#247;"
                    type="operator"
                    onPress={() => handleTap("operator", "/")}
                    darkmode={darkmode}
                />
            </View>
            

            <View style={st.column}>
                <Button title="4" 
                        type="number"
                        onPress={() => handleTap("number", 4)}
                        darkmode={darkmode} />
                <Button title="5"
                        type="number"
                        onPress={() => handleTap("number", 5)}
                        darkmode={darkmode} />
                <Button title="6" 
                        type="number"
                        onPress={() => handleTap("number", 6)}
                        darkmode={darkmode} />
                <Button
                    title="&#215;"
                    type="operator"
                    onPress={() => handleTap("operator", "*")}
                    darkmode={darkmode}
                />
            </View>

            <View style={st.column}>
                <Button title="1" 
                        type="number"
                        onPress={() => handleTap("number", 1)}
                        darkmode={darkmode} />
                <Button title="2" 
                        type="number"
                        onPress={() => handleTap("number", 2)}
                        darkmode={darkmode} />
                <Button title="3" 
                        type="number"
                        onPress={() => handleTap("number", 3)}
                        darkmode={darkmode} />
                <Button
                    title="&#45;"
                    type="operator"
                    onPress={() => handleTap("operator", "-")}
                    darkmode={darkmode}
                />
            </View>

            <View style={st.column}>
                <Button title="."
                        type="number"
                        onPress={() => handleTap("number", '.')}
                        darkmode={darkmode} />
                <Button title="0" 
                        type="number"
                        onPress={() => handleTap("number", 0)}
                        darkmode={darkmode} />
                <Button
                    title="&#61;"
                    type="equal"
                    onPress={() => handleTap("equal", "=")}
                    darkmode={darkmode}
                />
                <Button
                    title="&#43;"
                    type="operator"
                    onPress={() => handleTap("operator", "+")}
                    darkmode={darkmode}
                />
            </View>
        </View>
    </View>
  )
}

const st = StyleSheet.create({
    container:{
        flex:1
    },
    containerDark:{
        flex:1,
        backgroundColor:'#333333'
    },
    displayContainer:{
        height:200,
        alignItems:'flex-end',
        justifyContent:'flex-end'
    },
    formula:{
        fontSize:60
    },
    result:{
        fontSize:70,
        margin:15,
        marginBottom:-10,
        color:'#e2aaa9'
    },
    seperator:{
        width:'93%',
        borderWidth:0.5,
        alignSelf:'center',
        marginTop:20,
        marginBottom:20
    },
    seperatorDark:{
        width:'93%',
        borderWidth:0.5,
        borderColor:'#666666',
        alignSelf:'center',
        marginTop:20,
        marginBottom:20
    },
    buttonContainer:{
        padding:2
    },
    column:{
        flexDirection:'row',
        height:90,
        alignItems:'center'
    }
})

export default Caculator