import { Component } from '@angular/core';
import { ClientService } from 'src/app/shared/client.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent {

  constructor(public service: ClientService,
    public dialogRef: MatDialogRef<ClientComponent>) { }

  ngOnInit() {

  }

  onClear() {
    this.service.form.reset();
    this.service.initializeFormGroup();
  }

  onSubmit() {
    if (this.service.form.valid) {
      console.log(this.service.form.value)
      this.service.insertClient(this.service.form.value).subscribe(data => {

        console.log(data);

      });
      this.service.form.reset();
      this.service.initializeFormGroup();
      this.onClose();
    }
  }

  onClose() {
    this.service.form.reset();
    this.service.initializeFormGroup();
    this.dialogRef.close();
  }
}
