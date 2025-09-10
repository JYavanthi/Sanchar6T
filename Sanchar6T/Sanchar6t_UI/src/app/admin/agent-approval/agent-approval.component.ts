// import { Component } from '@angular/core';
// import { HttpServiceService } from '../../services/http-service.service';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';

// @Component({
//   selector: 'app-agent-approval',
//   templateUrl: './agent-approval.component.html',
//   styleUrl: './agent-approval.component.scss'
// })
// export class AgentApprovalComponent {

//   agentList: any
//   constructor(public httpSer: HttpServiceService ,private httpClient: HttpClient) {

//   }

//   ngOnInit() {
//     this.getAgentDetails()
//   }
//    getAgentDetails(){
//     this.httpSer.httpGet('/AgentDtls/GetAgent').subscribe((res:any) => {
//       this.agentList = res.data
//     })
//   }
//   approveAgent(agentDtlID: number) {
//     const approvalData = { agentDtlID, status: 'approved', createdBy:0    };
//     this.sendApprovalRequest(approvalData).subscribe(response => {
//       this.getAgentDetails(); 
//     });
//   }

//   rejectAgent(agentDtlID: number) {
//     const rejectionData = { agentDtlID, status: 'rejected', createdBy: 0 };
//     this.sendApprovalRequest(rejectionData).subscribe(response => {
//       this.getAgentDetails(); 
//     });
//   }

//   sendApprovalRequest(approvalData: any): Observable<any> {
//     return this.httpSer.httpPost('/AgentDtls/AgentApproval', approvalData);
//   }
// }


import { Component } from '@angular/core';
import { HttpServiceService } from '../../services/http-service.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-agent-approval',
  templateUrl: './agent-approval.component.html',
  styleUrls: ['./agent-approval.component.scss']
})
export class AgentApprovalComponent {
  agentList: any[] = [];
  approvedCount: number = 0;
  rejectedCount: number = 0;
  pendingCount: number = 0;

  constructor(public httpSer: HttpServiceService, private httpClient: HttpClient) {}

  ngOnInit() {
    this.getAgentDetails();
  }

  getAgentDetails() {
    this.httpSer.httpGet('/AgentDtls/GetAgent').subscribe((res: any) => {
      this.agentList = res.data;
      this.updateStatusCounts();  // Update counts whenever the agent data is fetched or refreshed
    });
  }

  approveAgent(agentDtlID: number) {
    const approvalData = { agentDtlID, status: 'approved', createdBy: 0 };
    this.sendApprovalRequest(approvalData).subscribe(response => {
      this.getAgentDetails();  // Refresh agent list after approval
    });
  }

  rejectAgent(agentDtlID: number) {
    const rejectionData = { agentDtlID, status: 'rejected', createdBy: 0 };
    this.sendApprovalRequest(rejectionData).subscribe(response => {
      this.getAgentDetails();  // Refresh agent list after rejection
    });
  }

  sendApprovalRequest(approvalData: any): Observable<any> {
    return this.httpSer.httpPost('/AgentDtls/AgentApproval', approvalData);
  }

  updateStatusCounts() {
    // Count the number of approved, rejected, and pending agents
    this.approvedCount = this.agentList.filter(agent => agent.status === 'approved').length;
    this.rejectedCount = this.agentList.filter(agent => agent.status === 'rejected').length;
    this.pendingCount = this.agentList.filter(agent => agent.status === 'pending').length;
  }
}
