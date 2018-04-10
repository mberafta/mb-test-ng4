import { Component, Input, EventEmitter, Output, ViewEncapsulation } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators, AbstractControl, ValidationErrors, FormArray, FormBuilder } from '@angular/forms';

@Component({
    selector: 'mb-text',
    templateUrl: './text.component.html',
    encapsulation: ViewEncapsulation.Emulated
})

export class TextComponent {
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

    get details(){
        return this.form.get('details');
    }

    testField: string;

    options: any[] = [
        { name: 'option A' },
        { name: 'option B' },
        { name: 'option C' }
    ];

    constructor(fb:FormBuilder){
        
    }

    @Input('inputPty') newInputPty: string;
    @Output() childEvent: EventEmitter<any> = new EventEmitter();

    onClick(): void {
        this.childEvent.emit({ msg: 'event from child' });
    }

    onSubmit() {
        console.log(this.form);
        this.form.setErrors({
            invalidLogin: true
        });
    }

    onChange(testVal: string): void {
        console.log(testVal);
    }

    addDetail(topic: HTMLInputElement) {
        (this.form.get('details') as FormArray).push(new FormControl(topic.value));
    }

}