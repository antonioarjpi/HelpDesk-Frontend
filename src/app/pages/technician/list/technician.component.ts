import { AfterViewInit, Component, ViewChild, OnInit } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { Technician } from "./../../../models/techinician";

@Component({
  selector: "app-technician",
  templateUrl: "./technician.component.html",
  styleUrls: ["./technician.component.css"],
})
export class TechnicianComponent implements OnInit {
  ELEMENT_DATA: Technician[] = [
    {
      id: "f26c811a-dff6-48f4-b01b-a1bb1c32532d",
      name: "Antônio Sousa",
      cpf: "702.830.330-61",
      email: "antonio@email.com",
      password: "123456",
      profiles: ["CLIENT", "TECH"],
      dateCadastre: "01/12/2022",
    },
  ];

  displayedColumns: string[] = [
    "position",
    "name",
    "weight",
    "symbol",
    "acoes",
  ];
  dataSource = new MatTableDataSource<Technician>(this.ELEMENT_DATA);

  constructor() {}

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
