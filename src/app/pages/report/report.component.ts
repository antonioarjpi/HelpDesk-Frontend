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
    if (this.report == "0") {

    } else if (this.report == "1") {

    } else if (this.report == "2") {
      this.sheetCalled();
    }
  }

  sheetCalled(): void {
    this.service.sheetCalleds().subscribe((blob) => {
      const a = document.createElement("a");
      const objectUrl = URL.createObjectURL(blob);
      a.href = objectUrl;
      a.download = "chamados.xlsx";
      a.click();
      URL.revokeObjectURL(objectUrl);
    });
  }
}
