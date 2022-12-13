import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { CalledService } from "src/app/services/called.service";
import { Called } from "./../../../models/called";
import { MatDialog } from '@angular/material/dialog';
import { CalledViewComponent } from "../called-view/called-view.component";

@Component({
  selector: "app-called-list",
  templateUrl: "./called-list.component.html",
  styleUrls: ["./called-list.component.css"],
})
export class CalledListComponent implements OnInit {
  ELEMENT_DATA: Called[] = [];
  FILTERED_DATA: Called[] = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = [
    "title",
    "clientName",
    "technicianName",
    "openDate",
    "priority",
    "status",
    "acoes",
  ];

  dataSource = new MatTableDataSource<Called>(this.ELEMENT_DATA);

  constructor(private service: CalledService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.findAll();
  }

  openDialog(id: string): void {
    const dialogRef = this.dialog.open(CalledViewComponent , {
      data: id,
      width: '780px'
    });

    dialogRef.afterClosed().subscribe(result => {
      
    });
  }


  findAll() {
    this.service.findAll().subscribe((response) => {
      this.ELEMENT_DATA = response;
      this.dataSource = new MatTableDataSource<Called>(response);
      this.dataSource.paginator = this.paginator;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  returnStatus(status: any): string {
    if (status == '0') {
      return "ABERTO";
    } else if (status == '1') {
      return "ANDAMENTO";
    } else {
      return "FECHADO";
    }
  }

  returnPriority(status: any): string {
    if (status == "0") {
      return "BAIXA";
    } else if (status == "1") {
      return "MÉDIA";
    } else {
      return "ALTA";
    }
  }

  orderByStatus(status: any): void{
    let list: Called[] = [];
    this.ELEMENT_DATA.forEach(element => {
      if(element.status == status)
        list.push(element)
    });
    this.FILTERED_DATA = list;
    this.dataSource = new MatTableDataSource<Called>(list);
    this.dataSource.paginator = this.paginator;
  }

  listAll(): void{
    this.dataSource = new MatTableDataSource<Called>(this.ELEMENT_DATA);
    this.dataSource.paginator = this.paginator;
  }
}
