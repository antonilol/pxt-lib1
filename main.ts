//% color="#007FFF" block="(Extra) Functions" weight=100 icon="+"
namespace extra {

    export enum Bool {
        and = 0,
        or = 1,
        nand = 2,
        nor = 3,
        xor = 4,
        xnor = 5
    }
    export enum AnalogReadPins {
        P0 = AnalogPin.P0,
        P1 = AnalogPin.P1,
        P2 = AnalogPin.P2,
        P3 = AnalogPin.P3,
        P4 = AnalogPin.P4,
        P10 = AnalogPin.P10
    }

    export enum Slot {
        //% block="1"
        s1 = 0,
        //% block="2"
        s2 = 1,
        //% block="3"
        s3 = 2,
        //% block="4"
        s4 = 3,
        //% block="5"
        s5 = 4,
        //% block="6"
        s6 = 5,
        //% block="7"
        s7 = 6,
        //% block="8"
        s8 = 7,
        //% block="9"
        s9 = 8,
        //% block="10"
        s10 = 9,
        //% block="11"
        s11 = 10,
        //% block="12"
        s12 = 11,
        //% block="13"
        s13 = 12,
        //% block="14"
        s14 = 13,
        //% block="15"
        s15 = 14,
        //% block="16"
        s16 = 15,
        //% block="17"
        s17 = 16,
        //% block="18"
        s18 = 17,
        //% block="19"
        s19 = 18,
        //% block="20"
        s20 = 19,
        //% block="21"
        s21 = 20,
        //% block="22"
        s22 = 21,
        //% block="23"
        s23 = 22,
        //% block="24"
        s24 = 23,
        //% block="25"
        s25 = 24,
        //% block="26"
        s26 = 25,
        //% block="27"
        s27 = 26,
        //% block="28"
        s28 = 27,
        //% block="29"
        s29 = 28,
        //% block="30"
        s30 = 29,
        //% block="31"
        s31 = 30,
        //% block="32"
        s32 = 31,
        //% block="33"
        s33 = 32,
        //% block="34"
        s34 = 33,
        //% block="35"
        s35 = 34,
        //% block="36"
        s36 = 35,
        //% block="37"
        s37 = 36,
        //% block="38"
        s38 = 37,
        //% block="39"
        s39 = 38,
        //% block="40"
        s40 = 39,
        //% block="41"
        s41 = 40,
        //% block="42"
        s42 = 41,
        //% block="43"
        s43 = 42,
        //% block="44"
        s44 = 43,
        //% block="45"
        s45 = 44,
        //% block="46"
        s46 = 45,
        //% block="47"
        s47 = 46,
        //% block="48"
        s48 = 47,
        //% block="49"
        s49 = 48,
        //% block="50"
        s50 = 49,
        //% block="51"
        s51 = 50,
        //% block="52"
        s52 = 51,
        //% block="53"
        s53 = 52,
        //% block="54"
        s54 = 53,
        //% block="55"
        s55 = 54,
        //% block="56"
        s56 = 55,
        //% block="57"
        s57 = 56,
        //% block="58"
        s58 = 57,
        //% block="59"
        s59 = 58,
        //% block="60"
        s60 = 59,
        //% block="61"
        s61 = 60,
        //% block="62"
        s62 = 61,
        //% block="63"
        s63 = 62,
        //% block="64"
        s64 = 63
    }
    /**
     * TODO [DEFAULT]
     */
    //% block="every $ms ms, start directly $startDirectly" blockId=repeat
    export function repeat(ms: number, startDirectly: boolean, handler: (indexNum: number, totalWaitingTime: number) => void) {
        let indexNum: number = 1;
        let totalWaitingTime: number = 0;
        if (ms > 0) {

            while (true) {
                if (!(startDirectly && indexNum == 1)) {
                    basic.pause(ms);
                    totalWaitingTime = totalWaitingTime + ms
                }
                handler(indexNum, totalWaitingTime);
                indexNum = indexNum + 1;
            }
        }
    }
    /**
     * On analog pin change
     * When 'minDiff' is set to 0 or negative, this block does the same as basic.forever
     * @param minDiff eg:1
     */
    //% pin.fieldEditor="gridpicker" pin.fieldOptions.columns=2
    //% pin.fieldOptions.tooltips="false" pin.fieldOptions.width="200"
    //% block="on analog pin change $pin minimum difference $minDiff" blockId=onAnalogPinChange
    //% minDiff.min=0 minDiff.max=1023
    export function onAnalogPinChange(pin: AnalogReadPins, minDiff: number, handler: (pin_value: number) => void) {
        let analogValue1 = 0
        let analogValue2 = 0
        let if1 = 0
        let pin2: number = pin
        while (true) {
            analogValue1 = pins.analogReadPin(pin2)
            if (if1 && Math.abs(analogValue1 - analogValue2) >= minDiff) {
                handler(analogValue1)
            }
            basic.pause(1)
            analogValue2 = pins.analogReadPin(pin2)
            if1 = 1
            if (if1 && Math.abs(analogValue1 - analogValue2) >= minDiff) {
                handler(analogValue2)
            }
            basic.pause(1)
        }
    }




    let func2: ((x: number) => void)[] = [function (x: number) { }];
    for (let _i = 0; _i <= 63; _i++) {
        func2.push(function (x: number) { })
    }


    /**
     * TODO [DEFAULT]
     */
    //% slot.fieldEditor="gridpicker" slot.fieldOptions.columns=8
    //% slot.fieldOptions.tooltips="false" slot.fieldOptions.width="200"
    //% block="define function with number arg (slot=$slot)" blockId=defFunction
    export function defFunction(slot: Slot, handler: (arg: number) => void) {
        let arg: number;

        func2[slot] = handler;

    }
    /**
     * TODO [DEFAULT]
     */
    //% slot.fieldEditor="gridpicker" slot.fieldOptions.columns=8
    //% slot.fieldOptions.tooltips="false" slot.fieldOptions.width="200"
    //% block="call function with number arg $arg (slot=$slot)" blockId=callFunction
    export function callFunction(slot: Slot, arg: number) {

        func2[slot](arg);

    }



    /**
     * TODO [DEFAULT]
     */
    //% block="$a $x $b" blockId=op
    export function op(a: boolean, x: Bool, b: boolean): boolean {
        if (x == 0) {
            return (a && b);
        } else if (x == 1) {
            return (a || b);
        } else if (x == 2) {
            return !(a && b);
        } else if (x == 3) {
            return !(a || b);
        } else if (x == 4) {
            return a != b;
        } else if (x == 5) {
            return a == b;
        } else {
            return false;
        }
    }





    /**
     * Stackable block to create extremely large blocks.
     * @param value eg:3
     */
    //% block="$value" blockId=numb
    export function numb(value: number): number {
        return value;
    }

    /**
     * Empty event block
     */
    //% block="" blockId=emptyevent
    export function emptyevent(handler: () => void): void {

    }
}