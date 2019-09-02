import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Group, User } from '../group';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css']
})
export class DashComponent implements OnInit {

  uri: string = 'http://localhost:3000';

  users;
  
  // = [
  //   { id: 0, name: "user1" },
  //   { id: 2, name: "user2" },
  //   { id: 3, name: "user3" },
  //   { id: 4, name: "user4" },
  //   { id: 5, name: "user5" },
  // ];

  group_users= {
    "group1": [
      { id: 0, name: "user1" },
      { id: 2, name: "user2" },
      { id: 3, name: "user3" },
      { id: 4, name: "user4" },
      { id: 5, name: "user5" },
    ]
  }
  // [
  //   { id: 0, name: "gu1" },
  //   { id: 2, name: "gu2" },
  //   { id: 3, name: "gu3" },
  //   { id: 4, name: "gu4" },
  //   { id: 5, name: "gu5" },
  // ];

  // groups = [
  //   { id: 0, name: "policy001" },
  //   { id: 2, name: "policy002" },
  //   { id: 3, name: "policy003" },
  //   { id: 4, name: "policy004" },
  //   { id: 5, name: "policy005" },
  // ];
user;
  groups ; 
  group;
  // = [
  //   {  name: "policy001" },
  //   {  name: "policy002" },
  //   { name: "policy003" },
  //   {  name: "policy004" },
  //   { name: "policy005" }
  // ];

  selectedGroup: Group;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {
    // group_users = new GroupUser();
  }

  ngOnInit() {

    this.getGroups();
    this.getUsers();
  }

  getGroups()
  {
    this.http.get(`${this.uri}/api/groups`).subscribe(
      data => {
        // this.vvv = data; 
        console.log(data);
        this.groups = data;//JSON.parse(data);       
      }
    );
  }

  addGroup() {
    // if group is exist return
    // this.groups.push({ id: 33, name: "33" });

    const group ={
      name: this.group
    }
    this.http.post(`${this.uri}/api/groups`, group).subscribe(
      data => {
        // this.vvv = data; 
        console.log(data);
        this.getGroups();
        // this.groups =data;//JSON.parse(data);       
      },

      // error=>{

      // }
    );
  }

  deleteGroup(group1: Group): void {

    this.http.delete<Group>(`${this.uri}/api/groups/${group1.id}`, this.httpOptions).subscribe(
      data => {
        // this.vvv = data; 
        console.log(data);
        this.getGroups();
   
      });
  }

  getUsers(){
    this.http.get(`${this.uri}/api/users`).subscribe(
      data => {
        // this.vvv = data; 
        console.log(data);
        this.users = data;//JSON.parse(data);       
      }
    );
  }

  addUser() {
    
    const group ={
      username: this.user
    }
    this.http.post(`${this.uri}/api/users`, group).subscribe(
      data => {
        // this.vvv = data; 
        console.log(data);
        this.getUsers();
        // this.groups =data;//JSON.parse(data);       
      });
  }

  addUserIntoGroup() {
  //  this.group_users.group1.push( { id: 90, name: "xxx" },);
    // object.property = value;
  }


  onSelect(group: Group): void {
    this.selectedGroup = group;
    // this.users = this.getgroup_users();
  }

  deleteUser(user: User): void {
    console.log('afda');
    // this.groups.pop();
    for (var i = 0; i < this.users.length; i++) {
      if (this.users[i].name === user.name) {
        this.users.splice(i, 1);
      }
    }
  }

  deleteGU(user: User): void {
    console.log('afda');
    // this.groups.pop();
    for (var i = 0; i < this.group_users.group1.length; i++) {
      if (this.group_users[i].name === user.name) {
        this.groups.splice(i, 1);
      }
    }
  }

  getgroup_users() {
    return this.group_users;
  }

}
