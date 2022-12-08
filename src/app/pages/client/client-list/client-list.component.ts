import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { Client } from "src/app/models/client";
import { ClientService } from './../../../services/client.service';

@Component({
  selector: "app-client-list",
  templateUrl: "./client-list.component.html",
  styleUrls: ["./client-list.component.css"],
})

export class ClientListComponent implements OnInit {
  ELEMENT_DATA: Client[] = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = ["name", "cpf", "email", "acoes"];
  dataSource = new MatTableDataSource<Client>(this.ELEMENT_DATA);

  constructor(private service: ClientService) {}

  ngOnInit(): void {
    this.findAll();
  }

  ngAfterViewInit() {}

  findAll() {
    this.service.findAll().subscribe((response) => {
      this.ELEMENT_DATA = response;
      this.dataSource = new MatTableDataSource<Client>(response);
      this.dataSource.paginator = this.paginator;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
