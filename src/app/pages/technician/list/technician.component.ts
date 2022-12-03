import { AfterViewInit, Component, ViewChild, OnInit } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { Technician } from "./../../../models/techinician";
import { TechnicianService } from "./../../../services/technician.service";

@Component({
  selector: "app-technician",
  templateUrl: "./technician.component.html",
  styleUrls: ["./technician.component.css"],
})
export class TechnicianComponent implements OnInit {
  ELEMENT_DATA: Technician[] = [];
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = [
    "id",
    "name",
    "cpf",
    "email",
    "acoes",
  ];
  dataSource = new MatTableDataSource<Technician>(this.ELEMENT_DATA);

  constructor(private service: TechnicianService) {}


  ngOnInit(): void {
    this.findAll();
  }

  ngAfterViewInit() {}

  findAll() {
    this.service.findAll().subscribe((response) => {
      this.ELEMENT_DATA = response;
      this.dataSource = new MatTableDataSource<Technician>(response);
      this.dataSource.paginator = this.paginator;
    });
  }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
