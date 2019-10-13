//% color="#007FFF" block="(Extra) Images" weight=100 icon="\uf03e"
namespace extra_img {
    
    export enum Operator {
        //% block="a and b"
        and = 0,
        //% block="not (a and b)"
        nand = 2,
        //% block="a or b"
        or = 1,
        //% block="not (a or b)"
        nor = 3,
        //% block="a xor b"
        xor = 4,
        //% block="not (a xor b)"
        xnor = 5,
        //% block="not a"
        inv1 = 6,
        //% block="not b"
        inv2 = 7,
        //% block="a - b"
        min1 = 8,
        //% block="b - a"
        min2 = 9,
    }
    export enum Position {
        //% block="left"
        left = 0,
        //% block="center"
        centre = 1,
        //% block="right"
        right = 2
    }
  

    /**
     * TODO
     */
    //% block="empty" blockId=empty weight=99
    export function empty(): Image {
        return images.createImage(`
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        `);
    }
    /**
     * TODO
     */
    //% block="filled" blockId=filled  weight=97
    export function filled(): Image {
        return images.createImage(`
        # # # # #
        # # # # #
        # # # # #
        # # # # #
        # # # # #
        `);
    }
    /**
     * TODO
     */
    //% block="random" blockId=random  weight=98
    export function random(): Image {
        let output: Image = null
        output = images.createImage(`
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        `)
        for (let imgx = 0; imgx < 5; imgx++) {
            for (let imgy = 0; imgy < 5; imgy++) {
                output.setPixel(imgx, imgy, Math.randomBoolean())
            }
        }
        return output
    }
    /**
     * TODO
     */
    //% block="screen" blockId=screen weight=97
    export function screen(): Image {
        let output= images.createImage(`
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        `);
        for (let x = 0; x < 5; x++) {
             for (let y = 0; y < 5; y++) {
                 output.setPixel(y, x, led.point(y,x));
             }
        }
        return output;
    }
    //% block="pixel x $x y $y of $img" blockId=getpixel weight=94
    //% x.min=0 x.max=4
    //% y.min=0 y.max=4
    export function getpixel(x:number,y:number,img:Image): boolean {
        
        return img.pixel(x,y);
    }
    /**
     * Boolean operators for images
     * @param imgA eg:null
     * @param imgB eg:null
     */
    //% x.fieldEditor="gridpicker" x.fieldOptions.columns=2
    //% x.fieldOptions.tooltips="false" 
    //% block="(a = $imgA, b = $imgB) $x" blockId=opImg  weight=96
    export function opImg(imgA: Image, imgB: Image, x: Operator): Image {
        let output: Image = null
        output = images.createImage(`
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        `);
        if ((imgA && imgB) || (x == 6 && imgA) || (x == 7 && imgB)) {
            let a: boolean = false;
            let b: boolean = false;
            for (let imgx = 0; imgx < 5; imgx++) {
                for (let imgy = 0; imgy < 5; imgy++) {
                    a = imgA.pixel(imgy, imgx);
                    b = imgB.pixel(imgy, imgx);
                    if (x == 0) {
                        output.setPixel(imgy, imgx, a && b);
                    } else if (x == 1) {
                        output.setPixel(imgy, imgx, a || b);
                    } else if (x == 2) {
                        output.setPixel(imgy, imgx, !(a && b));
                    } else if (x == 3) {
                        output.setPixel(imgy, imgx, !(a || b));
                    } else if (x == 4) {
                        output.setPixel(imgy, imgx, a != b);
                    } else if (x == 5) {
                        output.setPixel(imgy, imgx, a == b);
                    } else if (x == 6) {
                        output.setPixel(imgy, imgx, !a);
                    } else if (x == 7) {
                        output.setPixel(imgy, imgx, !b);
                    } else if (x == 8) {
                        output.setPixel(imgy, imgx, a && (a != b));
                    } else if (x == 9) {
                        output.setPixel(imgy, imgx, b && (a != b));
                    } else {
                        output.setPixel(imgy, imgx, false);
                    }
                }
            }
        }
        return output;
    }

    /**
     * Shows the given image
     * @param img eg:null
     */
    //% block="show image $img" blockId=showImage weight=100
    export function showImg(img: Image): void {
        if (img) {
            img.showImage(0)
        }
    }

    /**
     * TODO
     */
    //% block="binary (number $numb) (+$offset|px) (reversed $reversed)" blockId=binImage  weight=95
    export function binImage(numb: number, offset: number, reversed: boolean): Image {
        let output: Image = null
        output = images.createImage(`
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        `)
        for (let index = 0; index <= 24; index++) {
            if (numb >= 2 ** (24 - index)) {
                numb += -1 * 2 ** (24 - index)
                if (!(reversed)) {
                    output.setPixel((offset - index) % 5, Math.floor((offset - index) / 5), true)
                } else {
                    output.setPixel((offset + 24 - index) % 5, Math.floor((offset + 24 - index) / 5), true)
                }
            }
        }
        return output
    }
    /**
     * Edit a particular pixel on an image
     * @param img eg:null
     * @param point eg:extra_img.newPoint(0,0)
     */
    //% block="edit pixel on image $img x $x y $y to $newvalue" blockId=editImage  weight=94
    export function editImage(img: Image, x: number, y: number, newvalue: boolean): void {
        if (img) {
            img.setPixel(x, y, newvalue)
        }
    }

    /**
     * Returns an image with a 7-segment 1-digit number.
     * @param offset eg:1
     */
    //% block="7-seg <10 >=0 $value $pos" blockId=seg7
    //% value.min=0 value.max=9 weight=93
    //% pos.fieldEditor="gridpicker" pos.fieldOptions.columns=1
    //% pos.fieldOptions.tooltips="false" pos.fieldOptions.width="50"
    export function seg7(value: number, pos: Position): Image {
        let output: Image = null
        output = images.createImage(`
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        `)
        if (value >= 0 && value <= 9) {
            let list: number[][] = [[[1, 1, 1], [1, 0, 1], [1, 0, 1], [1, 0, 1], [1, 1, 1]],
            [[0, 0, 1], [0, 0, 1], [0, 0, 1], [0, 0, 1], [0, 0, 1]],
            [[1, 1, 1], [0, 0, 1], [1, 1, 1], [1, 0, 0], [1, 1, 1]],
            [[1, 1, 1], [0, 0, 1], [1, 1, 1], [0, 0, 1], [1, 1, 1]],
            [[1, 0, 1], [1, 0, 1], [1, 1, 1], [0, 0, 1], [0, 0, 1]],
            [[1, 1, 1], [1, 0, 0], [1, 1, 1], [0, 0, 1], [1, 1, 1]],
            [[1, 1, 1], [1, 0, 0], [1, 1, 1], [1, 0, 1], [1, 1, 1]],
            [[1, 1, 1], [0, 0, 1], [0, 0, 1], [0, 0, 1], [0, 0, 1]],
            [[1, 1, 1], [1, 0, 1], [1, 1, 1], [1, 0, 1], [1, 1, 1]],
            [[1, 1, 1], [1, 0, 1], [1, 1, 1], [0, 0, 1], [1, 1, 1]]][value];
            for (let y = 0; y <= 4; y++) {
                for (let x = 0; x <= 2; x++) {
                    if (list[y][x]) {
                        output.setPixel(x + pos, y, true);
                    }
                }
            }
        }
        return output
    }
    /**
     * Returns an image with a 7-segment 2-digit number.
     * @param value eg:10
     */
    //% block="7-seg <20 >=10 $value" blockId=seg72  weight=92
    //% value.min=10 value.max=19
    export function seg72(value: number): Image {
        let output: Image = null
        output = images.createImage(`
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        `)
        if (value >= 10 && value <= 19) {
            for (let y = 0; y <= 4; y++) {
                output.setPixel(0, y, true);
            }
            output = opImg(output, seg7(value - 10, 2), Operator.or);
        }
        return output
    }
    

}
