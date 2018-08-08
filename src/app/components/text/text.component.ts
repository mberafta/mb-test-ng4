import { Component, Input, EventEmitter, Output, ViewEncapsulation, OnChanges, SimpleChange } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators, AbstractControl, ValidationErrors, FormArray, FormBuilder } from '@angular/forms';
import { trigger, transition, animate, style, state } from '@angular/animations';

// Alias pour simplier les notations
type typeAlias = string | number;

@Component({
    selector: 'mb-text',
    templateUrl: './text.component.html',
    encapsulation: ViewEncapsulation.Emulated,
    animations: [
        trigger('fade', [
            state('void', style({
                background: "white", opacity: 0, transform:"translateX(-100px)"
            })),
            state('*', style({
                background: "#3498db", opacity: 1, transform:"translateX(0px)"
            })),
            transition('void <=> *', [
                animate(350)
            ])
        ])
    ]
})

export class TextComponent {

    items: any[] = [];

    cannotContainSpace(control: AbstractControl): ValidationErrors | null {
        if (control.value != null && (control.value as string).indexOf(' ') != -1)
            return { cannotContainSpace: true };

        return null;
    }

    shouldBeUnique(control: AbstractControl): Promise<ValidationErrors | null> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                console.log('timeout done');
                if (control.value === 'mosh')
                    resolve({ shouldBeUnique: true });
                else
                    resolve(null);
            }, 2000);
        });
    }

    form = new FormGroup({
        address: new FormGroup({
            city: new FormControl(
                null, Validators.required
            ),
            postalCode: new FormControl(
                null, Validators.required
            )
        }),
        firstname: new FormControl(
            null,
            [
                Validators.required,
                Validators.minLength(3),
                this.cannotContainSpace
            ],
            this.shouldBeUnique),
        lastname: new FormControl(
            null,
            [
                Validators.required,
                Validators.minLength(3),
                this.cannotContainSpace
            ]),
        details: new FormArray([

        ])
    });

    get firstname() {
        return this.form.get('firstname');
    }

    get lastname() {
        return this.form.get('lastname');
    }

    get details() {
        return this.form.get('details');
    }

    testField: string;

    options: any[] = [
        { name: 'option A' },
        { name: 'option B' },
        { name: 'option C' }
    ];

    constructor(fb: FormBuilder) {
        this.overloadedFunction("LoL");
        this.overloadedFunction(45);
    }

    ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
        for (let propName in changes) {
            let changedProp = changes[propName];
            let newValue = changedProp.currentValue;
            if (changedProp.isFirstChange()) {
                console.log('Valeur initiale pour la propriété ${propName} -> ${newValue}');
            }
            else {
                let oldValue = changedProp.previousValue;
                console.log('Changement de valeur pour la propriété ${propName} : ${oldValue} -> ${newValue}');
            }
        }
    }

    @Input('inputPty') newInputPty: string;
    @Output() childEvent: EventEmitter<any> = new EventEmitter();

    onClick(): void {
        this.childEvent.emit({ msg: 'event from child' });
    }

    onSubmit() {
        console.log(this.form.value);
    }

    onChange(testVal: string): void {
        console.log(testVal);
    }

    addDetail(topic: HTMLInputElement) {
        (this.form.get('details') as FormArray).push(new FormControl(topic.value));
    }

    removeItem(index: number): void {
        this.items.splice(index, 1);
    }

    addItem(): void {
        let newItem = "Item " + this.items.length;
        this.items.push(newItem);
    }

    useCallbackTest(num: number, callbackFunction: (paramNumber: number) => string) {
        console.log(callbackFunction(num));
    }

    callbackTest(paramNumber: number): string {
        console.log(paramNumber);
        return paramNumber.toString();
    }

    overloadedFunction(entry: typeAlias): void {
        console.log(typeof(entry));
    }
}