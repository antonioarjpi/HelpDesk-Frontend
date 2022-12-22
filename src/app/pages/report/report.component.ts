import { Component, OnInit } from "@angular/core";
import { ReportService } from "src/app/services/report.service";

@Component({
  selector: "app-report",
  templateUrl: "./report.component.html",
  styleUrls: ["./report.component.css"],
})
export class ReportComponent implements OnInit {
  constructor(private service: ReportService) { }

  report: string;

  ngOnInit(): void { }

  reportDownload(): void {
    this.service.sheetCalleds(this.report).subscribe((blob) => {
      const a = document.createElement("a");
      const objectUrl = URL.createObjectURL(blob);
      a.href = objectUrl;
      a.download = "";
      if (this.report == "0") {
        a.download = "clientes.xlsx";
      } else if (this.report == "1") {
        a.download = "técnicos.xlsx";
      } else if (this.report == "2") {
        a.download = "chamados.xlsx";
      }
      a.click();
      URL.revokeObjectURL(objectUrl);
    });
  }
}
