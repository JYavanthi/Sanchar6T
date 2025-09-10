import { Component, HostListener, Renderer2 } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpServiceService } from '../../services/http-service.service';
import { API_URLS } from '../../shared/API-URLs'
import { FormValidationService } from '../../services/form-validation.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiConverterService } from '../../services/api-converter.service';
import { HttpClient } from '@angular/common/http';
import { __values } from 'tslib';
import { UserServiceService } from '../../services/user-service.service';

@Component({
  selector: 'app-bus-booking',
  templateUrl: './bus-booking.component.html',
  styleUrl: './bus-booking.component.scss',
  animations: [
    trigger('expandCollapse', [
      state('void', style({
        height: '0px',
        opacity: '0',
        padding: '0px',
        overflow: 'hidden'
      })),
      state('*', style({
        height: '*',
        opacity: '1',
        padding: '10px',
        overflow: 'visible'
      })),
      transition('void <=> *', [
        animate('300ms ease-in-out')
      ])
    ]),
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(10px)' }),
        animate('300ms 0s', style({ opacity: 1, transform: 'translateX(0)' }))
      ]),
      transition(':leave', [
        style({ opacity: 1, transform: 'translateX(0)' }),
        animate('300ms 0s', style({ opacity: 0, transform: 'translateX(10px)' }))
      ])
    ])
  ]
})
export class BusBookingComponent {

  busBookingForm!: FormGroup;
  isUserLoggedIn: boolean = false;
  userId: string | null = null;
  selectedTab: number = 0;
  bloodGroups: string[] = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  seatLegends: string[] = ['Available', 'Unavailable', 'Female', 'Male', 'Selected'];
  idCardList: string[] = ['Aadhar Card', 'PAN Card', 'D/L', 'Passport', 'Voter ID', 'Ration Card'];
  busTypeFilters: any[] = [];
  // isAmenitiesOpen: boolean = false;
  // isBoardingDroppingPointsOpen: boolean = false;
  // isBookingPoliciesOpen: boolean = false;
  // isViewSeatOpen: boolean = false;
  isBoardingDroppingDtlsOpen: boolean = false;
  isPassengerDtlsOpen: boolean = false;
  // isCancellationPolicy: boolean = true;
  isSeatLegendOpen: boolean = true;
  isPopupVisible: boolean = false;
  isDetailsVisible: boolean = true;
  isCancellationPolicy: boolean = true;
  showChoosingProfile: boolean[] = [];
  showPassengerInputs: boolean[] = [];
  isMobile: boolean = false;
  stageList: any[] = [];
  cityList: any[] = [];
  cityPairList: any[] = [];
  schedulesList: any[] = [];
  operatorPolicyList: any[] = [
    {
      "id": 21,
      "name": "Siri Travels R5",
      "cancellation_time": 0,
      "cancel_based_on_main_dep_allowed": true,
      "logo_internal": "http://www.siri-r6.ticketsimply.co.in/assets/siri_v1/images/logo_internal.png",
      "logo_small": "http://www.siri-r6.ticketsimply.co.in/assets/siri_v1/images/logo_small.jpg",
      "logo": "http://www.siri-r6.ticketsimply.co.in/assets/siri_v1/images/logo.png",
      "operator_url": "http://www.siri-r6.ticketsimply.co.in/",
      "cancellation_policies": "0-24|100,24-720|30",
      "created_at": "2017-07-03 17:21",
      "updated_at": "2025-02-17 16:36",
      "convenience_charge_percent": 0,
      "service_tax_percent": 5,
      "schedules_per_day": 0,
      "round_trip": false,
      "time_zone": "Asia/Calcutta",
      "reschedule_policies": "0-24|NO_RESCHEDULE,24-1440|30",
      "restrict_partial_cancellation": false,
      "max_ladies_seat_count": "2",
      "max_gents_seat_count": "10",
      "cc_type": 1,
      "coach_type_category_amenities": "{}"
    }
  ];

  masterAPI: any = {
    "result": {
      "seat_layout_identifiers": {
        ".GY": "Gangway",
        ".DR_IMG": "Driver Image",
        ".ST_IMG": "Strairs Image",
        ".WR_IMG": "Wash Room Image",
        ".BR": "Break",
        "SS": "Semi Sleeper",
        "SL": "Sleeper",
        "LB": "Lower Berth",
        "UB": "Upper Berth",
        "BS": "Semi Cama",
        "PB": "Push Back",
        "NPB": "No Push Back",
        "SLB": "Side Lower Berth",
        "SUB": "Side Upper Berth",
        "SST": "Single Seat",
        "NA": "Un Reservable Seat",
        "ST": "Seater",
        "DLB": "Double Lower Berth",
        "DUB": "Double Upper Berth",
        "WSS": "Window Semi Sleeper",
        "WST": "Window Seater",
        "WLB": "Window Lower Berth",
        "WUB": "Window Upper Berth",
        "WSL": "Window Single Lower",
        "WSU": "Window Single Upper",
        "BU": "Cama Suite",
        "EC": "Economy Class",
        "SEMI CAMA": "SEMI CAMA",
        "SALON CAMA": "SALON CAMA",
        "CLASICO": "Clasico",
        "EJECUTIVO": "Ejecutivo",
        "PREMIUM": "Premium",
        "SC": "Semi Cama",
        "CO": "Comun Con",
        "EX": "Cama",
        "SP": "SP",
        "SALON": "SALON",
        "SALON MIXTO": "SALON MIXTO",
        "SEMICAMA": "SEMI CAMA",
        "CAMA": "SALON CAMA",
        "COMUN": "COMUN",
        "COMUN CON AIRE": "COMUN CON AIRE",
        "SCA": "SCA",
        "SX": "SX",
        "BLACK": "BLACK",
        "PULLMAN": "PULLMAN",
        "CA": "Ejecutivo",
        "XP": "Cama",
        "PREMIUM PROMO": "Premium Promo",
        "SALON CAMA PROMO": "Salon Cama Promo",
        "SEMICAMA PROMO": "Semicama Promo",
        "CAMA VIP": "CAMA VIP",
        "Cama Ejecutivo": "Cama Ejecutivo",
        "Cama Suite": "Cama Suite",
        "BJ": "SALON CAMA",
        "EJ": "SALON CAMA",
        "SU": "Cama Suite",
        "BT": "Semi Cama",
        "SJ": "Semi Cama",
        "LS": "Semi Cama",
        "SUITE CAMA": "SUITE CAMA",
        "COMPARTIDO": "COMPARTIDO",
        "EXCLUSIVO": "EXCLUSIVO",
        "SEMI EXCLUSIVO": "SEMI EXCLUSIVO"
      }
    }
  };
  filteredDepartureCities: any[] = [];
  filteredDestinationCities: any[] = [];
  filteredScheduleList: any[] = [];
  originID!: number;
  destinationID!: number;
  dateOfDeparture: any;
  travelID: any;
  seaterSeats: any[] = [];
  sleeperLowerDeck: any[] = [];
  sleeperUpperDeck: any[] = [];
  selectedBus: any = null;
  parsedSeatLayout: any[][] = [];
  selectedSeats: number[] = [];
  lowerDeckSeats: { seatNumber: number, available: boolean }[] = [];
  upperDeckSeats: { seatNumber: number, available: boolean }[] = [];
  seatNumber!: number | null;
  selectedFilters: string[] = [];
  operatorOpenSections: { [operatorId: string]: { amenities: boolean, boardingDroppingPoints: boolean, bookingPolicies: boolean } } = {};
  operatorViewSeat: { [operatorId: string]: boolean } = {};
  filteredSchedules: any = {
    departure: {
      before6am: [],
      '6amTo12pm': [],
      '12pmTo6pm': [],
      after6pm: []
    },
    arrival: {
      before6am: [],
      '6amTo12pm': [],
      '12pmTo6pm': [],
      after6pm: []
    }
  };
  operatorScheduleAPIData: any =
    {
      "result": [
        [
          "id",
          "number",
          "name",
          "operator_service_name",
          "origin_id",
          "destination_id",
          "route_id",
          "travel_id",
          "bus_type",
          "dep_time",
          "arr_time",
          "duration",
          "available_seats",
          "total_seats",
          "service_tax_percent",
          "fare_str",
          "is_cancellable",
          "commission",
          "status",
          "op_schedule_id",
          "convenience_charge_percent",
          "amenities",
          "boarding_stages",
          "dropoff_stages",
          "deals",
          "cancellation_policies",
          "trip_id",
          "agent_cancellation_time",
          "updated_at",
          "route_map_id",
          "is_service_tax_applicable",
          "via",
          "is_ac_bus",
          "allow_reschedule",
          "travel_date",
          "route_version",
          "bp_dp_fares",
          "bp_dp_pair_fares",
          "city_seq_order",
          "cc_type",
          "main_dep_time",
          "transaction_charges",
          "no_coach_layout",
          "is_package_fare_allowed",
          "cancellation_reference_type",
          "social_distancing_guaranteed",
          "reschedule_policies",
          "o_available",
          "o_available_gst",
          "is_o_available_fare_enabled_booking",
          "parent_travel_id",
          "show_fare_screen",
          "o_fare_str",
          "last_seats"
        ],
        [
          202502136529,
          "laxminew",
          "123",
          "Siri Travels R5",
          134,
          251,
          1169,
          21,
          "1+2, Sleeper, AC, Non-Video",
          "20:00",
          "06:00",
          "10:00",
          30,
          30,
          5.0,
          "SLB:1000.0,SUB:1000.0,DLB:1000.0,DUB:1000.0",
          true,
          "",
          "Update",
          258374,
          0.0,
          null,
          "2544|20:00",
          "7338|06:00",
          " ",
          "",
          "BITLA:21:1169",
          0,
          "2025-02-03 12:40:16 UTC",
          null,
          true,
          "",
          true,
          true,
          "2025-02-13",
          "202502136529-1",
          {},
          {},
          [
            "134",
            "251"
          ],
          "",
          "13/02/2025 20:00",
          "",
          false,
          false,
          "By Main Departure Time",
          false,
          "",
          "",
          "",
          false,
          "",
          "1000.0",
          "",
          ""
        ]
      ],
      "stage_names": {
        "2544": "Anand Rao Circle",
        "7338": "Koyembedu"
      },
      "processed_schedules_count": 1
    };
  operatorScheduleList: any[] = this.operatorScheduleAPIData.result.slice(1).map((operatorSchedule: any[]) => ({
    id: operatorSchedule[0],
    number: operatorSchedule[1],
    name: operatorSchedule[2],
    operator_service_name: operatorSchedule[3],
    origin_id: operatorSchedule[4],
    destination_id: operatorSchedule[5],
    route_id: operatorSchedule[6],
    travel_id: operatorSchedule[7],
    bus_type: operatorSchedule[8],
    dep_time: operatorSchedule[9],
    arr_time: operatorSchedule[10],
    duration: operatorSchedule[11],
    available_seats: operatorSchedule[12],
    total_seats: operatorSchedule[13],
    service_tax_percent: operatorSchedule[14],
    fare_str: operatorSchedule[15],
    is_cancellable: operatorSchedule[16],
    commission: operatorSchedule[17],
    status: operatorSchedule[18],
    op_schedule_id: operatorSchedule[19],
    convenience_charge_percent: operatorSchedule[20],
    amenities: operatorSchedule[21],
    boarding_stages: operatorSchedule[22],
    dropoff_stages: operatorSchedule[23],
    deals: operatorSchedule[24],
    cancellation_policies: operatorSchedule[25],
    trip_id: operatorSchedule[26],
    agent_cancellation_time: operatorSchedule[27],
    updated_at: operatorSchedule[28],
    route_map_id: operatorSchedule[29],
    is_service_tax_applicable: operatorSchedule[30],
    via: operatorSchedule[31],
    is_ac_bus: operatorSchedule[32],
    allow_reschedule: operatorSchedule[33],
    travel_date: operatorSchedule[34],
    route_version: operatorSchedule[35],
    bp_dp_fares: operatorSchedule[36],
    bp_dp_pair_fares: operatorSchedule[37],
    city_seq_order: operatorSchedule[38],
    cc_type: operatorSchedule[39],
    main_dep_time: operatorSchedule[40],
    transaction_charges: operatorSchedule[41],
    no_coach_layout: operatorSchedule[42],
    is_package_fare_allowed: operatorSchedule[43],
    cancellation_reference_type: operatorSchedule[44],
    social_distancing_guaranteed: operatorSchedule[45],
    reschedule_policies: operatorSchedule[46],
    o_available: operatorSchedule[47],
    o_available_gst: operatorSchedule[48],
    is_o_available_fare_enabled_booking: operatorSchedule[49],
    parent_travel_id: operatorSchedule[50],
    show_fare_screen: operatorSchedule[51],
    o_fare_str: operatorSchedule[52],
    last_seats: operatorSchedule[53]
  }));
  operatorPolicyAPIData: any = {
    "result": [
      [
        "id",
        "name",
        "cancellation_time",
        "cancel_based_on_main_dep_allowed",
        "logo_internal",
        "logo_small",
        "logo",
        "operator_url",
        "cancellation_policies",
        "created_at",
        "updated_at",
        "convenience_charge_percent",
        "service_tax_percent",
        "schedules_per_day",
        "round_trip",
        "time_zone",
        "reschedule_policies",
        "restrict_partial_cancellation",
        "max_ladies_seat_count",
        "max_gents_seat_count",
        "cc_type",
        "coach_type_category_amenities"
      ],
      [
        11,
        "Pact stg Travels",
        0,
        false,
        "http://www.pact-stg.ticketsimply.co.in/assets/sastik_v1/images/logo_internal.png",
        "http://www.pact-stg.ticketsimply.co.in/assets/sastik_v1/images/logo_small.jpg",
        "http://www.pact-stg.ticketsimply.co.in/assets/sastik_v1/images/logo.png",
        "http://www.pact-stg.ticketsimply.co.in/",
        "0-4|100,4-12|50,12-24|20,24-720|15",
        "2016-08-18 15:31",
        "2024-12-13 17:31",
        0.0,
        6.0,
        0,
        false,
        "Asia/Calcutta",
        "",
        false,
        "",
        "",
        1,
        "{}"
      ],
      [
        21,
        "Siri Travels R5",
        0,
        true,
        "http://www.siri-r6.ticketsimply.co.in/assets/siri_v1/images/logo_internal.png",
        "http://www.siri-r6.ticketsimply.co.in/assets/siri_v1/images/logo_small.jpg",
        "http://www.siri-r6.ticketsimply.co.in/assets/siri_v1/images/logo.png",
        "http://www.siri-r6.ticketsimply.co.in/",
        "0-24|100,24-720|30",
        "2017-07-03 17:21",
        "2025-02-17 16:36",
        0.0,
        5.0,
        0,
        false,
        "Asia/Calcutta",
        "0-24|NO_RESCHEDULE,24-1440|30",
        false,
        "2",
        "10",
        1,
        "{}"
      ],
      [
        38,
        "Gotour Staging",
        0,
        false,
        "http://www.gotour-stg.ticketsimply.co.in/assets//images/logo_internal.png",
        "http://www.gotour-stg.ticketsimply.co.in/assets//images/logo_small.jpg",
        "http://www.gotour-stg.ticketsimply.co.in/assets//images/logo.png",
        "http://www.gotour-stg.ticketsimply.co.in/",
        "0-12|100,12-24|75,24-720|15",
        "2020-06-23 14:30",
        "2024-01-23 13:34",
        0.0,
        5.0,
        0,
        false,
        "Asia/Calcutta",
        "",
        false,
        "1",
        "1",
        1,
        "{}"
      ],
      [
        48,
        "VAPT Travels",
        0,
        true,
        "http://www.vapt.ticketsimply.co.in/assets/simhapuri_v1/images/logo_internal.png",
        "http://www.vapt.ticketsimply.co.in/assets/simhapuri_v1/images/logo_small.jpg",
        "http://www.vapt.ticketsimply.co.in/assets/simhapuri_v1/images/logo.png",
        "http://www.vapt.ticketsimply.co.in/",
        "",
        "2023-12-12 18:02",
        "2024-01-28 21:09",
        0.0,
        5.0,
        0,
        false,
        "Asia/Calcutta",
        "",
        false,
        null,
        null,
        1,
        "{}"
      ]
    ]
  };
  singleOperatorDataList: any =
    {
      "result": {
        "id": "2025022311390",
        "name": "123",
        "number": "laxminew",
        "service_name": "Siri Travels R5",
        "origin_id": 134,
        "destination_id": 251,
        "op_schedule_id": 258404,
        "travel_date": "2025-02-23",
        "travel_id": 21,
        "travels_name": "Siri Travels R5",
        "route_id": 1169,
        "route_map_id": null,
        "available_seats": 29,
        "description": "",
        "dep_time": "20:00",
        "duration": "10:00",
        "arr_time": "06:00",
        "bus_type": "1+2, Sleeper, AC, Non-Video",
        "bus_type_id": 2,
        "cost": "SLB:1000.0,SUB:1000.0,DLB:1000.0,DUB:1000.0",
        "can_cancel": true,
        "cancellation_time": 0,
        "cabin_layout": false,
        "status": "Update",
        "is_service_tax_applicable": true,
        "helpline_number": null,
        "amenities": "[\"Pillow\",\"CC Camera\"]",
        "via": "",
        "bus_layout": {
          "total_seats": 30,
          "coach_details": "U1|SUB-L1|SLB-|.GY-L2|DLB-L3|DLB-U2|DUB-U3|DUB,--|.GY,U4|SUB-L4|SLB-|.GY-L5|DLB-L6|DLB-U5|DUB-U6|DUB,--|.GY,U7|SUB-L7|SLB-|.GY-L8|DLB-L9|DLB-U8|DUB-U9|DUB,--|.GY,U10|SUB-L10|SLB-|.GY-L11|DLB-L12|DLB-U11|DUB-U12|DUB,--|.GY,U13|SUB-L13|SLB-|.GY-L14|DLB-L15|DLB-U14|DUB-U15|DUB,--|.GY",
          "available": ",U1|1000.0,L1|1000.0,L2|1000.0,L3|1000.0,U2|1000.0,U3|1000.0,U4|1000.0,L4|1000.0,L5|1000.0,L6|1000.0,U5|1000.0,U6|1000.0,U7|1000.0,L7|1000.0,L8|1000.0,L9|1000.0,U8|1000.0,U9|1000.0,U10|1000.0,L10|1000.0,L11|1000.0,L12|1000.0,U11|1000.0,U12|1000.0,U13|1000.0,L14|1000.0,L15|1000.0,U14|1000.0,U15|1000.0",
          "available_gst": "U1|50.0,L1|50.0,L2|50.0,L3|50.0,U2|50.0,U3|50.0,U4|50.0,L4|50.0,L5|50.0,L6|50.0,U5|50.0,U6|50.0,U7|50.0,L7|50.0,L8|50.0,L9|50.0,U8|50.0,U9|50.0,U10|50.0,L10|50.0,L11|50.0,L12|50.0,U11|50.0,U12|50.0,U13|50.0,L14|50.0,L15|50.0,U14|50.0,U15|50.0",
          "ladies_seats": "",
          "gents_seats": "",
          "ladies_booked_seats": "",
          "gents_booked_seats": "L13",
          "allow_gents_next_to_ladies": true,
          "allow_ladies_next_to_gents": true,
          "boarding_stages": "2544|20:00|Morning Star Travels Office, Beside Volvo Car Show Room, Swiss Complex, Near Race Course Circle|Morning Star Travels Office, Beside Volvo Car Show Room, Swiss Complex, Near Race Course Circle|456|Anand Rao Circle|1|",
          "dropoff_stages": "7338|06:00|Bus Stand|Near Petrol|9009001231|Koyembedu|2|",
          "floor": "",
          "last_seats": "",
          "forced_seats": "",
          "fares_hash": {
            "SLB": {
              "Adult": "1000"
            },
            "SUB": {
              "Adult": "1000"
            },
            "DLB": {
              "Adult": "1000"
            },
            "DUB": {
              "Adult": "1000"
            }
          },
          "branch_available": "",
          "branch_available_gst": "",
          "o_available": "",
          "o_available_gst": "",
          "o_fare_str": ""
        },
        "trip_id": "BITLA:21:1169",
        "city_seq_order": [
          "134",
          "251"
        ],
        "cancellation_policy": "",
        "main_dep_time": "23/02/2025 20:00",
        "service_tax_percent": 5.0,
        "convenience_charge_percent": 0.0,
        "is_ac_bus": true,
        "api_type": 1,
        "allow_reschedule": true,
        "route_version": "2025022311390-4",
        "flexi_fare": null,
        "allow_ladies_to_book_double_seats": true,
        "is_seperate_service_tax_allowed": false,
        "is_inclusive_service_tax": false,
        "is_bima_branch_fare_enabled_booking": false,
        "is_bima_online_agent_fare_enabled_booking": false,
        "is_bima_eticket_fare_enabled_booking": false,
        "is_fare_exclusive_of_transaction_charges": false,
        "is_dp_enabled_service": false,
        "res_details": {},
        "transaction_charges": "",
        "no_coach_layout": false,
        "is_package_fare_allowed": false,
        "cancellation_reference_type": "By Main Departure Time",
        "social_distancing_guaranteed": false,
        "reschedule_policies": "",
        "pincode_hash": {
          "pincode": "optional",
          "state": "optional",
          "city": "optional"
        },
        "parent_travel_id": "",
        "is_excluded_for_rb": false
      }
    }
  singleOperatorDataList2: any =
    {
      "result": {
        "id": "2025022311390",
        "name": "123",
        "number": "laxminew",
        "service_name": "Siri Travels R5",
        "origin_id": 134,
        "destination_id": 251,
        "op_schedule_id": 258404,
        "travel_date": "2025-02-23",
        "travel_id": 21,
        "travels_name": "Siri Travels R5",
        "route_id": 1169,
        "route_map_id": null,
        "available_seats": 29,
        "description": "",
        "dep_time": "20:00",
        "duration": "10:00",
        "arr_time": "06:00",
        "bus_type": "1+2, Sleeper, AC, Non-Video",
        "bus_type_id": 2,
        "cost": "SLB:1000.0,SUB:1000.0,DLB:1000.0,DUB:1000.0",
        "can_cancel": true,
        "cancellation_time": 0,
        "cabin_layout": false,
        "status": "Update",
        "is_service_tax_applicable": true,
        "helpline_number": null,
        "amenities": "[\"Pillow\",\"CC Camera\"]",
        "via": "",
        "bus_layout": {
          "total_seats": 12,
          "coach_details": "1|ST-2|ST-|.GY-3|ST-4|ST,5|ST-6|ST-|.GY-7|ST-8|ST,9|ST-10|ST-|.GY-11|ST-12|ST",
          "available": ",1|525.0,2|525.0,3|525.0,4|525.0,5|525.0,6|525.0,7|525.0,8|525.0,9|525.0,10|525.0,11|525.0,12|525.0",
          "available_gst": "1|26.0,2|26.0,3|26.0,4|26.0,5|26.0,6|26.0,7|26.0,8|26.0,9|26.0,10|26.0,11|26.0,12|26.0",
          "ladies_seats": "",
          "gents_seats": "",
          "ladies_booked_seats": "",
          "gents_booked_seats": "L13",
          "allow_gents_next_to_ladies": true,
          "allow_ladies_next_to_gents": true,
          "boarding_stages": "2544|20:00|Morning Star Travels Office, Beside Volvo Car Show Room, Swiss Complex, Near Race Course Circle|Morning Star Travels Office, Beside Volvo Car Show Room, Swiss Complex, Near Race Course Circle|456|Anand Rao Circle|1|",
          "dropoff_stages": "7338|06:00|Bus Stand|Near Petrol|9009001231|Koyembedu|2|",
          "floor": "",
          "last_seats": "",
          "forced_seats": "",
          "fares_hash": {
            "SLB": {
              "Adult": "1000"
            },
            "SUB": {
              "Adult": "1000"
            },
            "DLB": {
              "Adult": "1000"
            },
            "DUB": {
              "Adult": "1000"
            }
          },
          "branch_available": "",
          "branch_available_gst": "",
          "o_available": "",
          "o_available_gst": "",
          "o_fare_str": ""
        },
        "trip_id": "BITLA:21:1169",
        "city_seq_order": [
          "134",
          "251"
        ],
        "cancellation_policy": "",
        "main_dep_time": "23/02/2025 20:00",
        "service_tax_percent": 5.0,
        "convenience_charge_percent": 0.0,
        "is_ac_bus": true,
        "api_type": 1,
        "allow_reschedule": true,
        "route_version": "2025022311390-4",
        "flexi_fare": null,
        "allow_ladies_to_book_double_seats": true,
        "is_seperate_service_tax_allowed": false,
        "is_inclusive_service_tax": false,
        "is_bima_branch_fare_enabled_booking": false,
        "is_bima_online_agent_fare_enabled_booking": false,
        "is_bima_eticket_fare_enabled_booking": false,
        "is_fare_exclusive_of_transaction_charges": false,
        "is_dp_enabled_service": false,
        "res_details": {},
        "transaction_charges": "",
        "no_coach_layout": false,
        "is_package_fare_allowed": false,
        "cancellation_reference_type": "By Main Departure Time",
        "social_distancing_guaranteed": false,
        "reschedule_policies": "",
        "pincode_hash": {
          "pincode": "optional",
          "state": "optional",
          "city": "optional"
        },
        "parent_travel_id": "",
        "is_excluded_for_rb": false
      }
    }

  filteredBusTypes: any = {
    'seater': [],
    'sleeper': [],
    'ac': [],
    'nonAc': []
  }

  savedPassengerDtls: any[] = [];

  constructor(private fb: FormBuilder, private userService: UserServiceService, private httpc: HttpClient, private router: Router, private renderer: Renderer2, public apiConverter: ApiConverterService, private http: HttpServiceService, private formValidation: FormValidationService, private aRoute: ActivatedRoute) {
  }


  ngAfterViewInit(): void {
    fetch('/assets/SVG Icons/home-icons.html')
      .then(response => response.text())
      .then(svgData => {
        const div = this.renderer.createElement('div');
        div.innerHTML = svgData;
        document.body.appendChild(div);
      });
  }



  ngOnInit() {
    this.formInit();
    this.checkScreenSize();
    // this.getCities();
    // this.getStages();
    const cities = localStorage.getItem('localCityList');
    const cityPairs = localStorage.getItem('localCityPairsList');
    const stages = localStorage.getItem('localStageList');
    const schedules = localStorage.getItem('localSchedulesList');
    this.cityList = cities ? JSON.parse(cities) : [];
    this.cityPairList = cityPairs ? JSON.parse(cityPairs) : [];
    this.stageList = stages ? JSON.parse(stages) : [];
    this.schedulesList = schedules ? JSON.parse(schedules) : [];

    this.aRoute.queryParams.subscribe((g: any) => {
      if (g.originID) {
        this.originID = g.originID;
        this.destinationID = g.destinationID;
        this.dateOfDeparture = g.DOD;
      }

      if (g.depart) {
        this.busBookingForm.patchValue({
          departure: g.depart,
          destination: g.desti,
          dateOfDeparture: g.dod
        })
      }

      if (g.busDeparture) {
        this.busBookingForm.patchValue({
          departure: g.busDeparture,
          destination: g.busDestination,
          dateOfDeparture: new Date().toISOString().split('T')[0]
        })
      }
    })

    this.getScheduleList();
    this.getOperatorPolicy();
    this.fetchBusDetails();
    //To make all passenger inputs false by default
    this.showPassengerInputs = new Array(this.selectedSeats.length).fill(false);
    this.showChoosingProfile = new Array(this.selectedSeats.length).fill(false);

    this.userService.userId$.subscribe(id => (this.userId = id));
    this.userService.isUserLoggedIn$.subscribe(status => (this.isUserLoggedIn = status));
  }

  togglePassengerInputs(index: number): void {
    this.showPassengerInputs[index] = !this.showPassengerInputs[index];
  }

  toggleChoosingProfile(index: number): void {
    this.showChoosingProfile[index] = !this.showChoosingProfile[index];
  }

  getOperatorPolicy() {
    if (this.operatorPolicyList.length > 0) {
      this.operatorPolicyList = this.operatorPolicyList.map(policy => ({
        ...policy,
        cancellationDetails: policy.cancellation_policies ? policy.cancellation_policies.split(',').map((entry: any) => {
          const [time, charge] = entry.split('|'); return { cancellation_time: time, cancellation_charges: charge };
        }) : [],
        rescheduleDetails: policy.reschedule_policies ? policy.reschedule_policies.split(',').map((entry: any) => {
          const [time, charge] = entry.split('|'); return { reschedule_time: time, reschedule_charges: charge };
        }) : []
      }
      ));
    }
  }


  getScheduleList() {
    if (this.schedulesList.length > 0) {
      const originNameItem = this.cityList.find(item => item.id == Number(this.schedulesList[0].origin_id));
      const destinationNameItem = this.cityList.find(item => item.id == Number(this.schedulesList[0].destination_id));

      this.busBookingForm.patchValue({
        departure: originNameItem?.name || '',
        destination: destinationNameItem?.name || '',
        dateOfDeparture: this.schedulesList[0].travel_date
      });

      this.schedulesList = this.schedulesList.map((s) => {
        const originCity = this.cityList.find(city => city.id === s.origin_id);
        const destinationCity = this.cityList.find(city => city.id === s.destination_id);

        const mapStagesWithTime = (stages: string) => {
          if (!stages) return [];
          return stages.split(',').map(stage => {
            const [id, time] = stage.split('|');
            const stageItem = this.stageList.find(st => st.id == Number(id));
            return stageItem ? `${stageItem.name}|${time}` : null;
          }).filter(Boolean);
        };

        return {
          ...s,
          origin_name: originCity ? originCity.name : '',
          destination_name: destinationCity ? destinationCity.name : '',
          amenitiesList: s.amenities ? JSON.parse(s.amenities) : '',
          boarding_stages_with_time: mapStagesWithTime(s.boarding_stages),
          dropoff_stages_with_time: mapStagesWithTime(s.dropoff_stages),
        };
      });
      this.filteredScheduleList = [...this.schedulesList];

      this.gettingBusByTime();
      this.gettingBusTypes();
      console.log('scheduleList', this.schedulesList)
    }
  }

  onBoardingDroppingChange() {
    const boardingPoint = this.busBookingForm.get('boardingPoint')?.value?.toLowerCase() || '';
    const droppingPoint = this.busBookingForm.get('droppingPoint')?.value?.toLowerCase() || '';
    const operator = this.busBookingForm.get('operator')?.value?.toLowerCase() || '';

    this.filteredScheduleList = this.filteredScheduleList.filter(bus => {
      const boardingLocations = bus.boarding_stages_with_time.map((stage: any) => stage.split('|')[0].toLowerCase());
      const droppingLocations = bus.dropoff_stages_with_time.map((stage: any) => stage.split('|')[0].toLowerCase());

      return (
        (!boardingPoint || boardingLocations.some((location: any) => location.includes(boardingPoint))) &&
        (!droppingPoint || droppingLocations.some((location: any) => location.includes(droppingPoint))) &&
        (!operator || bus.operator_service_name.toLowerCase().includes(operator))
      );
    });

    if (!boardingPoint && !droppingPoint && !operator) {
      this.filteredScheduleList = [...this.schedulesList];
    }
  }

  gettingBusTypes() {
    const returnFilterBusType = (type: string) => {
      return this.schedulesList.filter(item =>
        item.bus_type
          .toLowerCase()
          .split(', ')
          .map((word: any) => word.trim())
          .includes(type)
      );
    };

    this.filteredBusTypes['seater'] = returnFilterBusType('seater');
    this.filteredBusTypes['sleeper'] = returnFilterBusType('sleeper');
    this.filteredBusTypes['ac'] = returnFilterBusType('ac');
    this.filteredBusTypes['nonAc'] = returnFilterBusType('non-ac');
  }

  onBusTypeChange(value: string) {
    let isChecked = this.busBookingForm.get(value)?.value;
    if (isChecked) {
      if (!this.busTypeFilters.includes(value)) {
        this.busTypeFilters.push(value);
      }
    } else {
      this.busTypeFilters = this.busTypeFilters.filter(filter => filter !== value);
    }
    this.filteredScheduleList = [];
    this.busTypeFilters.forEach(filter => {
      switch (filter) {
        case 'busTypeSeater':
          this.filteredScheduleList.push(...this.schedulesList.filter(bus => bus.bus_type.toLowerCase().includes('seater')));
          break;
        case 'busTypeSleeper':
          this.filteredScheduleList.push(...this.schedulesList.filter(bus => bus.bus_type.toLowerCase().includes('sleeper')));
          break;
        case 'busTypeAC':
          this.filteredScheduleList.push(...this.schedulesList.filter(bus => bus.bus_type.toLowerCase().includes('ac')));
          break;
        case 'busTypeNonAC':
          this.filteredScheduleList.push(...this.schedulesList.filter(bus => bus.bus_type.toLowerCase().includes('non-ac')));
          break;
      }
    });

    if (this.busTypeFilters.length === 0) {
      this.filteredScheduleList = [...this.schedulesList];
    }
  }

  fetchBusDetails() {
    // this.http.get(`https://your-api-url.com/bus-details/${busId}`)
    //   .subscribe((data: any) => {
    //     this.selectedBus = data.result;
    //     this.splitSeats();
    //   });
  }

  onTabChange(event: any) {
    console.log('hi', event.index);
  }

  operatorSchedule() {
    this.http.httpGet(`${API_URLS.OPERATOR_SCHEDULES}/${this.travelID}/${this.dateOfDeparture}.json`).subscribe((res) => {
      console.log('res', res)
    })
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenSize();
  }

  checkScreenSize() {
    this.isMobile = window.innerWidth <= 574;
    if (this.isMobile) {
      this.isDetailsVisible = false;
    } else {
      this.isDetailsVisible = true;
    }
  }

  togglePolicy(isCancellation: boolean) {
    this.isCancellationPolicy = isCancellation;
  }

  togglePopup() {
    this.isPopupVisible = !this.isPopupVisible;
  }

  toggleSection(operatorId: string, section: string) {
    if (!this.operatorOpenSections[operatorId]) {
      this.operatorOpenSections[operatorId] = {
        amenities: false,
        boardingDroppingPoints: false,
        bookingPolicies: false
      };
    }

    const sectionMap: { [key: string]: string } = {
      'Amenities': 'amenities',
      'BoardingDroppingPoints': 'boardingDroppingPoints',
      'BookingPolicies': 'bookingPolicies'
    };

    const key = sectionMap[section];
    const currentState = this.operatorOpenSections[operatorId];

    this.operatorOpenSections[operatorId] = {
      amenities: false,
      boardingDroppingPoints: false,
      bookingPolicies: false
    };

    if (!(currentState as any)[key]) {
      (this.operatorOpenSections[operatorId] as any)[key] = true;
    }
  }
  viewSeat(operatorId: any) {
    this.operatorViewSeat[operatorId] = !this.operatorViewSeat[operatorId];
    if (this.operatorViewSeat[operatorId]) {
      const selectedBusId = operatorId.toString();
      this.selectedBus = (this.singleOperatorDataList.result.id === selectedBusId)
        ? this.singleOperatorDataList.result
        : null;
      if (this.selectedBus) {
        this.splitSeats();
      }
    }
  }

  splitSeats() {
    if (!this.selectedBus || !this.selectedBus.bus_layout) {
      return;
    }

    const seatLayoutIdentifiers = this.masterAPI.result.seat_layout_identifiers;
    const coachDetails: string = this.selectedBus.bus_layout.coach_details;
    const availableData: string = this.selectedBus.bus_layout.available;
    const seatDataList = this.selectedBus.bus_layout.seatData || [];

    const seatFareMap = new Map<string, string>();
    availableData.split(",").forEach((seatInfo) => {
      if (seatInfo) {
        const [seatNumber, fare] = seatInfo.split("|");
        seatFareMap.set(seatNumber, fare);
      }
    });

    this.parsedSeatLayout = [];
    this.seaterSeats = [];
    this.sleeperLowerDeck = [];
    this.sleeperUpperDeck = [];
    let sleeperLowerDeckMap = new Map<string, any[]>();
    let sleeperUpperDeckMap = new Map<string, any[]>();

    const rows = coachDetails.split(",");

    let seaterSeatsTemp: any[] = [];
    const seatsPerRow = 5;

    rows.forEach((row) => {
      let parsedRow: any[] = [];
      row.split("-").forEach((column) => {
        const parts = column.split("|");
        const seatNumber = parts[0] || null;
        const seatType = parts[1] || parts[0];
        const displaySeatType = seatLayoutIdentifiers[seatType] || seatType;
        const fare = seatNumber ? seatFareMap.get(seatNumber) || null : null;
        const seatInfo = seatDataList.find((seat: any) => seat.seatNumber === seatNumber) || {};
        const seatData = {
          seatNumber,
          seatType: displaySeatType,
          price: fare,
          availability: seatInfo.availability || false,
          gst: seatInfo.gst || null,
          available_gst: seatInfo.available_gst || null,
          ladies_seats: seatInfo.ladies_seats || [],
          gents_seats: seatInfo.gents_seats || [],
          ladies_booked_seats: seatInfo.ladies_booked_seats || [],
          gents_booked_seats: seatInfo.gents_booked_seats || []
        };

        if (seatNumber) {
          if (displaySeatType.toLowerCase().includes("sleeper") ||
            displaySeatType.toLowerCase().includes("berth")) {
            if (seatNumber.startsWith("L")) {
              if (!sleeperLowerDeckMap.has(displaySeatType)) {
                sleeperLowerDeckMap.set(displaySeatType, []);
              }
              sleeperLowerDeckMap.get(displaySeatType)?.push(seatData);
            } else if (seatNumber.startsWith("U")) {
              if (!sleeperUpperDeckMap.has(displaySeatType)) {
                sleeperUpperDeckMap.set(displaySeatType, []);
              }
              sleeperUpperDeckMap.get(displaySeatType)?.push(seatData);
            }
          } else {
            seaterSeatsTemp.push(seatData);
            if (seaterSeatsTemp.length === seatsPerRow) {
              this.seaterSeats.push(seaterSeatsTemp);
              seaterSeatsTemp = [];
            }
          }
        }
        parsedRow.push(seatData);
      });

      this.parsedSeatLayout.push(parsedRow);
    });

    if (seaterSeatsTemp.length) this.seaterSeats.push(seaterSeatsTemp);
    const lowerDeckValues = Array.from(sleeperLowerDeckMap.values());
    if (lowerDeckValues.length > 0) {
      this.sleeperLowerDeck.push(lowerDeckValues[0]);
      if (lowerDeckValues.length > 1) {
        const remainingSeats = lowerDeckValues[1];
        const evenSeats = remainingSeats.filter((_, i) => i % 2 === 0);
        const oddSeats = remainingSeats.filter((_, i) => i % 2 !== 0);
        this.sleeperLowerDeck.push(evenSeats);
        this.sleeperLowerDeck.push(oddSeats);
      }
    }
    const upperDeckValues = Array.from(sleeperUpperDeckMap.values());
    if (upperDeckValues.length > 0) {
      this.sleeperUpperDeck.push(upperDeckValues[0]);
      if (upperDeckValues.length > 1) {
        const remainingSeats = upperDeckValues[1];
        const evenSeats = remainingSeats.filter((_, i) => i % 2 === 0);
        const oddSeats = remainingSeats.filter((_, i) => i % 2 !== 0);
        this.sleeperUpperDeck.push(evenSeats);
        this.sleeperUpperDeck.push(oddSeats);
      }
    }
  }

  toggleSeat(seat: number): void {
    if (this.selectedSeats.includes(seat)) {
      this.selectedSeats = this.selectedSeats.filter(s => s !== seat);
    } else {
      this.selectedSeats.push(seat);
    }
    this.selectedSeats.length > 0 ? this.isSeatLegendOpen = false : this.isSeatLegendOpen = true;
    this.updatePassengerList();
  }

  isSelected(seat: number): boolean {
    return this.selectedSeats.includes(seat);
  }

  onRadioChange(val: string, point: string) {
    if (point == "boardingPoint") {
      this.selectedTab = 1;
      this.busBookingForm.controls['boardingPointRadio'].patchValue(val);
    }
    if (point == "droppingPoint") {
      this.busBookingForm.controls['droppingPointRadio'].patchValue(val);
    }
    if (this.busBookingForm.controls['boardingPointRadio'].value &&
      this.busBookingForm.controls['droppingPointRadio'].value) {
      this.isBoardingDroppingDtlsOpen = true;
    }
  }

  proceedToBook() {
    if (this.isUserLoggedIn) {
      this.isPassengerDtlsOpen = !this.isPassengerDtlsOpen;
      this.getSavedPassengerDtls();
    }
    else {
      this.formValidation.showAlert('Please login to continue!', 'danger')
    }
  }

  formInit() {
    this.busBookingForm = this.fb.group({
      modifyDate: [new Date().toISOString().split('T')[0], Validators.required],
      departure: ['', Validators.required],
      destination: ['', Validators.required],
      dateOfDeparture: ['', Validators.required],
      passengerAlternativeNo: ['', Validators.required],
      passengerEmail: ['', Validators.required],
      // passengerAddress: ['', Validators.required],
      liveTracking: [''],
      departureTimeBefore6am: [false],
      departureTime6amTo12pm: [false],
      departureTime12pmTo6pm: [false],
      departureTimeAfter6pm: [false],
      busTypeSeater: [false],
      busTypeSleeper: [false],
      busTypeAC: [false],
      busTypeNonAC: [false],
      arrivalTimeBefore6am: [false],
      arrivalTime6amTo12pm: [false],
      arrivalTime12pmTo6pm: [false],
      arrivalTimeAfter6pm: [false],
      boardingPoint: [''],
      droppingPoint: [''],
      operator: [''],
      boardingPointRadio: [''],
      droppingPointRadio: [''],
      passengerNameCheckbox: [false],
      passengerDetails: this.fb.array([this.createPassengerGroup()]),
      savePassengerDetails: [false],
      toggleGST: [false],
      gstNo: ['', Validators.required],
      registeredCompanyName: ['', Validators.required],
      // passengerName: ['', Validators.required],
      // passengerAge: ['', [Validators.required, Validators.pattern('^[0-9]{1,2}$')]],  // Numeric validation
      // passengerPhoneNo: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],  // Phone number validation
      // passengerGender: ['', Validators.required],
      // passengerIDCard: ['', Validators.required],
      // passengerAlternativeNo: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      // passengerEmail: ['', [Validators.required, Validators.email]],
      // passengerAddress: ['', Validators.required],
      // passengerRemarks: ['', Validators.required]
    });

    this.busBookingForm.get('toggleGST')?.valueChanges.subscribe(value => {
      console.log('Toggle GST value:', value);
    });

    this.updatePassengerList();
  }


  markFormGroupTouched(formGroup: FormGroup | FormArray) {
    Object.values(formGroup.controls).forEach(control => {
      if (control instanceof FormGroup || control instanceof FormArray) {
        this.markFormGroupTouched(control);
      } else {
        control.markAsTouched();
      }
    });
  }

  get passengerDetails(): FormArray<FormGroup> {
    return this.busBookingForm.get('passengerDetails') as FormArray<FormGroup>;
  }

  updatePassengerList() {
    const passengerArray = this.passengerDetails;
    passengerArray.clear();
    this.selectedSeats.forEach(() => {
      passengerArray.push(this.createPassengerGroup());
    });
  }

  createPassengerGroup(): FormGroup {
    return this.fb.group({
      passengerGender: ['', Validators.required],
      passengerName: ['', Validators.required],
      passengerAge: ['', [Validators.required, Validators.pattern('^[0-9]{1,2}$')]],
      passengerPhoneNo: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      passengerIsWhatsApp: [false],
      passengerAddress: ['', Validators.required],
      passengerIDCard: ['', Validators.required],
      passengerIDCardNo: ['', Validators.required]
    });
  }
  

  copyFirstPassengerDtls(event: any) {
    const isChecked = event.target.checked;
    const formArray = this.passengerDetails;
    if (formArray.length < 2) return;
    const firstPassenger = formArray.at(0).value;
    formArray.controls.slice(1).forEach(control => {
      if (isChecked) {
        control.patchValue(firstPassenger);
      } else {
        control.patchValue({
          passengerGender: '',
          passengerName: '',
          passengerAge: null,
          passengerPhoneNo: null,
          passengerIsWhatsApp: false,
          passengerAddress: '',
          passengerIDCard: '',
          passengerIDCardNo: ''
        })
      }
    });
  }

  gettingBusByTime() {
    const timeRanges = {
      before6am: { start: 0, end: 6 * 60 },
      '6amTo12pm': { start: 6 * 60, end: 12 * 60 },
      '12pmTo6pm': { start: 12 * 60, end: 18 * 60 },
      after6pm: { start: 18 * 60, end: 24 * 60 }
    };

    const filterSchedulesByTimeRange = (timeRange: { start: number, end: number }, timeType: 'dep_time' | 'arr_time') => {
      return this.schedulesList.filter(schedule => {
        const timeInMinutes = (time: string) => {
          const [hour, minute] = time.split(':').map(Number);
          return hour * 60 + minute;
        };

        const timeInRange = timeInMinutes(schedule[timeType]);
        return timeInRange >= timeRange.start && timeInRange < timeRange.end;
      });
    };

    this.filteredSchedules.departure.before6am = filterSchedulesByTimeRange(timeRanges.before6am, 'dep_time');
    this.filteredSchedules.departure['6amTo12pm'] = filterSchedulesByTimeRange(timeRanges['6amTo12pm'], 'dep_time');
    this.filteredSchedules.departure['12pmTo6pm'] = filterSchedulesByTimeRange(timeRanges['12pmTo6pm'], 'dep_time');
    this.filteredSchedules.departure.after6pm = filterSchedulesByTimeRange(timeRanges.after6pm, 'dep_time');

    this.filteredSchedules.arrival.before6am = filterSchedulesByTimeRange(timeRanges.before6am, 'arr_time');
    this.filteredSchedules.arrival['6amTo12pm'] = filterSchedulesByTimeRange(timeRanges['6amTo12pm'], 'arr_time');
    this.filteredSchedules.arrival['12pmTo6pm'] = filterSchedulesByTimeRange(timeRanges['12pmTo6pm'], 'arr_time');
    this.filteredSchedules.arrival.after6pm = filterSchedulesByTimeRange(timeRanges.after6pm, 'arr_time');
  }

  onDepartureArrivalChange(value: string) {
    let isChecked = this.busBookingForm.get(value)?.value;

    if (isChecked) {
      if (!this.selectedFilters.includes(value)) {
        this.selectedFilters.push(value);
      }
    } else {
      this.selectedFilters = this.selectedFilters.filter(filter => filter !== value);
    }


    this.filteredScheduleList = [];

    this.selectedFilters.forEach(filter => {
      switch (filter) {
        case 'departureTimeBefore6am':
          this.filteredScheduleList.push(...this.filteredSchedules.departure.before6am);
          break;
        case 'departureTime6amTo12pm':
          this.filteredScheduleList.push(...this.filteredSchedules.departure['6amTo12pm']);
          break;
        case 'departureTime12pmTo6pm':
          this.filteredScheduleList.push(...this.filteredSchedules.departure['12pmTo6pm']);
          break;
        case 'departureTimeAfter6pm':
          this.filteredScheduleList.push(...this.filteredSchedules.departure.after6pm);
          break;
        case 'arrivalTimeBefore6am':
          this.filteredScheduleList.push(...this.filteredSchedules.arrival.before6am);
          break;
        case 'arrivalTime6amTo12pm':
          this.filteredScheduleList.push(...this.filteredSchedules.arrival['6amTo12pm']);
          break;
        case 'arrivalTime12pmTo6pm':
          this.filteredScheduleList.push(...this.filteredSchedules.arrival['12pmTo6pm']);
          break;
        case 'arrivalTimeAfter6pm':
          this.filteredScheduleList.push(...this.filteredSchedules.arrival.after6pm);
          break;
      }
    });

    if (this.selectedFilters.length === 0) {
      this.filteredScheduleList = [...this.schedulesList];
    }
  }

  openDatePicker() {
    const dateInput: any = document.querySelector('input[formControlName="modifyDate"]');
    if (dateInput) {
      dateInput.showPicker();
    }
  }

  updateDate(event: any) {
    this.busBookingForm.patchValue({ modifyDate: event.target.value });
  }

  toggleDetails() {
    this.isDetailsVisible = !this.isDetailsVisible;
  }

  getStages() {
    this.http.httpGet(API_URLS.STAGES).subscribe((res: any) => {
      this.stageList = res.result.slice(1).map((city: any[]) => ({
        id: city[0],
        name: city[1],
        city_id: city[1],
        city_name: city[2],
        latitude: city[3],
        longitude: city[4],
        area_name: city[5]
      }))
    })
  }

  getCities() {
    this.http.httpGet(API_URLS.CITIES).subscribe((res: any) => {
      this.cityList = res.result.slice(1).map((city: any[]) => ({
        id: city[0],
        name: city[1],
        origin_count: city[2],
        destination_count: city[3],
      }))
    })
  }
  selectItem(city: any, controlName: string) {
    this.busBookingForm.patchValue({ [controlName]: city.name });
    if (controlName === 'departure') {
      this.filteredDepartureCities = [];
    } else if (controlName === 'destination') {
      this.filteredDestinationCities = [];
    }
  }
  filterItem(controlName: string) {
    const value = this.busBookingForm.controls[controlName].value;
    if (value) {
      const filteredCities = this.cityList.filter((city: any) =>
        city.name.toLowerCase().startsWith(value.toLowerCase())
      );
      if (controlName === 'departure') {
        this.filteredDepartureCities = filteredCities.length ? filteredCities : [''];
      } else if (controlName === 'destination') {
        this.filteredDestinationCities = filteredCities.length ? filteredCities : [''];
      }
    }
  }
  modify() {
    if (this.formValidation.validateForm(this.busBookingForm)) {
      alert('Success')
    }
  }

  getSavedPassengerDtls() {
    this.http.httpGet(API_URLS.GetBusBookingSeat).subscribe((res: any) => {
      this.savedPassengerDtls = res;
    })
  }

  assignPassengerDtls() {
    const getSavedPassengerDtls = this.savedPassengerDtls.find((item: any) => item.busBookingSeatId == Number(this.busBookingForm.controls['savedPassengerID'].value));
    if (getSavedPassengerDtls) {
      this.busBookingForm.patchValue({
        fName: getSavedPassengerDtls?.firstName,
        mName: getSavedPassengerDtls?.middleName,
        lName: getSavedPassengerDtls?.lastName,
        gender: getSavedPassengerDtls?.gender,
        passengerEmail: getSavedPassengerDtls?.email,
        passengerPhoneNo: getSavedPassengerDtls?.contactNo,
        aadharNo: getSavedPassengerDtls?.aadharNo,
        PANNo: getSavedPassengerDtls?.pancardNo,
        emergencyNo: getSavedPassengerDtls?.emergencyNo,
        bloodGroup: getSavedPassengerDtls?.bloodGroup,
        passengerDOB: getSavedPassengerDtls?.dob?.split('T')[0],
        foodPref: getSavedPassengerDtls?.foodPref
      });
    }
  }
  saveMyDetails() {
    if (!this.formValidation.validateForm(this.busBookingForm)) {
      this.markFormGroupTouched(this.busBookingForm);
      this.formValidation.showAlert('Please fill all required fields', 'danger');
      return;
    }
  
    const firstPassenger = this.passengerDetails.at(0);
  
    const param = {
      flag: "I",
      busBookingSeatID: 0,
      userID: 0,
      forSelf: true,
      isPrimary: true,
      seatNo: this.selectedSeats.join(', '),
      firstName: firstPassenger.get('passengerName')?.value,  // Bind passengerName to firstName
      middleName: '',
      lastName: '',
      email: this.busBookingForm.get('passengerEmail')?.value,
      contactNo: firstPassenger.get('passengerPhoneNo')?.value?.toString(),
      gender: firstPassenger.get('passengerGender')?.value,
      aadharNo: firstPassenger.get('passengerIDCardNo')?.value,
      pancardNo: firstPassenger.get('passengerIDCardNo')?.value,
      bloodGroup: '',
      dob: new Date().toISOString(),
      foodPref: '',
      createdBy: Number(JSON.parse(localStorage.getItem('user') ?? '{}')?.UserId ?? 0)
    };
  
    this.http.httpPost('/BusBookingSeat/SaveBusBookingSeat', param).subscribe({
      next: (res: any) => {
        console.log("API Response:", res);
        if (res?.type === "S") {
          this.formValidation.showAlert('Details Saved', 'success');
          this.clearSavedDtls();
  
          // Navigate to the next page after success
          this.router.navigate(['/payment']);  // Replace '/next-page' with your actual route
        } else {
          this.formValidation.showAlert('Error saving details!', 'danger');
        }
      },
      error: (err) => {
        console.error("API call failed:", err);
        this.formValidation.showAlert('Something went wrong', 'danger');
      }
    });
  }
  
  

  // saveMyDetails() {
  //   if (!this.formValidation.validateForm(this.busBookingForm)) {
  //     this.markFormGroupTouched(this.busBookingForm);
  //     this.formValidation.showAlert('Please fill all required fields', 'danger');
  //     return;
  //   }

  //   const firstPassenger = this.passengerDetails.at(0);

  //   const param = {
  //     flag: "I",
  //     busBookingSeatID: 0,
  //     userID: 0,
  //     forSelf: true,
  //     isPrimary: true,
  //     seatNo: this.selectedSeats.join(', '),
  //     firstName: firstPassenger.get('passengerName')?.value,
  //     middleName: '',
  //     lastName: '',
  //     email: this.busBookingForm.get('passengerEmail')?.value,
  //     contactNo: firstPassenger.get('passengerPhoneNo')?.value?.toString(),
  //     gender: firstPassenger.get('passengerGender')?.value,
  //     aadharNo: firstPassenger.get('passengerIDCardNo')?.value,
  //     pancardNo: firstPassenger.get('passengerIDCardNo')?.value,
  //     bloodGroup: '',
  //     dob: new Date().toISOString(),
  //     foodPref: '',
  //     createdBy: Number(JSON.parse(localStorage.getItem('user') ?? '{}')?.UserId ?? 0)
  //   };

  //   console.log("Submitting:", param); // Debugging

  //   this.httpService.httpPost('/BusBookingSeat/PostBusBookingSeat', param).subscribe({
  //     next: (res: any) => {
  //       console.log("API response:", res);

  //       if (res?.type === "S") {
  //         this.formValidation.showAlert('Details Saved', 'success');
  //         this.clearSavedDtls();

  //         console.log("Navigating to /payment...");
  //         this.router.navigate(['/payment']).then(success => {
  //           if (!success) {
  //             console.error('Navigation to /payment failed');
  //             this.formValidation.showAlert('Navigation failed. Please try again.', 'danger');
  //           }
  //         });
  //       } else {
  //         console.warn('API did not return success type:', res);
  //         this.formValidation.showAlert('Error saving details!', 'danger');
  //       }
  //     },
  //     error: (err) => {
  //       console.error("API call failed:", err);
  //       this.formValidation.showAlert('Something went wrong', 'danger');
  //     }
  //   });

  // }
  clearSavedDtls() {
    // Clear busBookingForm
    this.busBookingForm.reset();
  
    // Clear passenger details FormArray
    this.passengerDetails.clear();
  
    // Reinitialize passengerDetails with fresh groups (one per selected seat)
    for (let i = 0; i < this.selectedSeats.length; i++) {
      this.passengerDetails.push(this.createPassengerGroup());
    }
  
    // Optionally reset the GST toggle if needed
    this.busBookingForm.patchValue({
      toggleGST: false
    });
  }
  

  formatDate(input: string): string {
    if (!input) return '';

    const [date, time] = input.split(' ');
    if (!date || !time) return '';

    try {
      return new Date(`${date}T${time}:00.000Z`).toISOString();
    } catch (error) {
      console.error("Invalid date format:", input);
      return '';
    }
  }
  
  // const param = {
  //   "flag": "I",
  //   "busBooKingDetailID": 0,
  //   "userID": 0,
  //   "fromDate": this.formatDate(this.schedulesList[1].travel_date + ' ' + this.busBookingForm.controls['boardingPointRadio'].value[0].split('|')[1]),
  //   "toDate": this.formatDate(this.schedulesList[1].travel_date + ' ' + this.busBookingForm.controls['droppingPointRadio'].value[0].split('|')[1]),
  //   "operatorID": Number(this.schedulesList[1].id),
  //   "agentID": 0,
  //   "boardingPoint": Number(this.schedulesList[1].boarding_stages.split('|')[0]),
  //   "droppingPoint": Number(this.schedulesList[1].dropoff_stages.split('|')[0]),
  //   "scheduleID": Number(this.singleOperatorDataList.result.op_schedule_id),
  //   "departureTime": this.formatDate(this.schedulesList[1].travel_date + ' ' + this.busBookingForm.controls['boardingPointRadio'].value[0].split('|')[1]),
  //   "arrivalTime": this.formatDate(this.schedulesList[1].travel_date + ' ' + this.busBookingForm.controls['droppingPointRadio'].value[0].split('|')[1]),
  //   "busNum": "",
  //   "status": "Active",
  //   "createdBy": 0 //logged in user id
  // }

  // this.httpService.httpPost('/BusBookingDetails/PosttBookingDetails', param).subscribe((res: any) => {
  //   if (res.type == "S") {
  //     this.formValidation.showAlert('Successfully Submitted', 'success');
  //   }
  //   else {
  //     this.formValidation.showAlert('Error!', 'danger');
  //   }
  // })


  isValidEmail(email: string): boolean {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  }

  getTooltipText(seat: any): string {
    return `Seat No: ${seat.seatNumber}
  Price: ₹${seat.price || 'N/A'}
  Seat Type: ${seat.seatType || 'N/A'}`;
  }


}
