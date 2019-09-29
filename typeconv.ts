//% color="#007FFF" block="(Extra) Type conversion" weight=100 icon=":"
namespace extra_typeconv {
    /**
     * returns:
     * if (x == 0){ false } else { true }
     * @param x eg:1
     */
    //% block="number to boolean $x" blockId=boolNumb
    export function numbBool(x: number): boolean {
        return !(!x)
    }
    /**
     * returns:
     * if (x == true){ 1 } else { 0 }
     * @param x eg:true
     */
    //% block="boolean to number $x" blockId=numbBool
    export function boolNumb(x: boolean): number {
        return x ? 1 : 0
    }
    /**
     * returns:
     * if (x == ''){ false } else { true }
     * @param x eg:'text'
     */
    //% block="string to boolean $x" blockId=stringBool
    export function stringBool(x: string): boolean {
        return !(!x)
    }
    /**
     * returns:
     * if (x == true){ 'true' } else { '' }
     * @param x eg:true
     */
    //% block="boolean to string $x (1)" blockId=boolString
    export function boolString(x: boolean): string {
        return x ? 'true' : ''
    }
    /**
     * returns:
     * if (x == true){ 'true' } else { 'false' }
     * NOTE: 'false' != false
     * @param x eg:true
     */
    //% block="boolean to string $x (2)" blockId=boolString2
    export function boolString2(x: boolean): string {
        return x ? 'true' : 'false'
    }
}