import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormValidationService } from '../../services/form-validation.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HttpServiceService } from '../../services/http-service.service';
import { API_URLS } from '../../shared/API-URLs';

@Component({
  selector: 'app-agent-signup',
  templateUrl: './agent-signup.component.html',
  styleUrl: './agent-signup.component.scss'
})
export class AgentSignupComponent {
  userForm: FormGroup;
  cityList: any;
  filteredDepartureCities: any[] = [];
  filteredDestinationCities: any[] = [];
  httpService: any;
  stageList: any;
  apiConverterService: any;
  cityPairList: any;
  selectedDestinationID!: number;
  selectedDepartureID: any;
  fileName: any;


  constructor(private fb: FormBuilder, private formValidation: FormValidationService, private http: HttpServiceService, private router: Router) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      LastName: ['', Validators.required],
      phone: [null, [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      email: ['', [Validators.required, Validators.email]],
      organization: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      Comments: ['', [Validators.required]],
      CompanyName: ['', Validators.required],
      CompanyAddress: ['', Validators.required],
      gstNo: ['', Validators.required],
      officename: ['', Validators.required],
      Out: ['', Validators.required],
      In: ['', Validators.required],
      ShopAddress: ['', Validators.required],
      password: ['', Validators.required],
      status: ['', Validators.required],
      registeredCompanyName: [''],
      gender: ['', Validators.required],
      toggleGST: [false]

    });
    this.userForm.get('toggleGST')?.valueChanges.subscribe((value) => {
    });
  }

  // onFileChange(event: any) {
  //   const file = event.target.files[0];
  //   if (file) {
  //     this.fileName = file.name;
  //   }
  // }

  // getCities() {
  //   const localCityList = localStorage.getItem('localCityList');
  //   if (localCityList) {
  //     this.cityList = localCityList ? JSON.parse(localCityList) : [];
  //   }
  // }

  // getCityPairs() {
  //   this.httpService.httpGet(API_URLS.CITY_PAIRS).subscribe((res: any) => {
  //     this.cityPairList = this.apiConverterService.mapData(res);
  //     if (this.cityPairList.length > 0) {
  //       localStorage.setItem('localCityPairsList', JSON.stringify(this.cityPairList))
  //     }
  //   })
  // }

  // getStages() {
  //   this.httpService.httpGet(API_URLS.STAGES).subscribe((res: any) => {
  //     this.stageList = this.apiConverterService.mapData(res);
  //     if (this.stageList.length > 0) {
  //       localStorage.setItem('localStageList', JSON.stringify(this.stageList))
  //     }
  //   })
  // }

  // selectItem(city: any, controlName: string) {
  //   this.userForm.patchValue({ [controlName]: city.name });
  //   if (controlName === 'userForm') {
  //     this.selectedDepartureID = city.id;
  //     this.filteredDepartureCities = [];
  //   } else if (controlName === 'userForm') {
  //     this.selectedDestinationID = city.id;
  //     this.filteredDestinationCities = [];
  //   }
  // }

  // filterItem(controlName: string) {
  //   const value = this.userForm.controls[controlName].value;
  //   if (value) {
  //     const filteredCities = this.cityList.filter((city: any) =>
  //       city.name.toLowerCase().startsWith(value.toLowerCase())
  //     );

  //     if (controlName === 'userForm') {
  //       this.filteredDepartureCities = filteredCities.length ? filteredCities : [''];
  //     } else if (controlName === 'userForm') {
  //       this.filteredDestinationCities = filteredCities.length ? filteredCities : [''];
  //     }
  //   }
  // }


  Submit() {
    if (!this.formValidation.validateForm(this.userForm)) {
      this.userForm.markAllAsTouched();
      setTimeout(() => { }, 0);
      return;
    }
    else {
      const param = {
        "flag": "I",
        "userID": 0,
        "userType": 3,
        "status": this.userForm.controls['status'].value,
        "password": this.userForm.controls['password'].value,
        "firstName": this.userForm.controls['name'].value,
        "middleName": this.userForm.controls['middleName']?.value || "",
        "lastName": this.userForm.controls['LastName'].value,
        "email": this.userForm.controls['email'].value,
        "contactNo": Number(this.userForm.controls['phone'].value) || 0,
        "gender": this.userForm.controls['gender'].value,
        "primaryUser": true,
        "companyName": this.userForm.controls['CompanyName'].value,
        "companyID": 0,
        "companyAddress": this.userForm.controls['CompanyAddress'].value,
        "shopAddress": this.userForm.controls['ShopAddress'].value,
        "organisation": this.userForm.controls['organization'].value,
        "city": this.userForm.controls['city'].value,
        "state": this.userForm.controls['state'].value,
        "comments": this.userForm.controls['Comments'].value,
        "gst": this.userForm.controls['gstNo'].value,
        "Amount":'0',
        "Type":'',
        "TransactionLimit":'',
        "createdBy": Number(JSON.parse(localStorage.getItem('user') ?? '{}')?.UserId ?? null)
      }
      this.http.httpPost('/api/User/PostUser', param).subscribe((res: any) => {
        if (res.type == "S") {
          this.formValidation.showAlert('Successfully Submitted', 'success');
          this.router.navigate(['/home']);
        } else {
          this.formValidation.showAlert('Error!!', 'danger');
        }
      })
    }
  }
  onClear() {
    this.userForm.reset();
  }
}
