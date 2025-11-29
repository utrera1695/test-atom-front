import { Pipe, PipeTransform } from "@angular/core";
import moment from "moment";
import "moment/locale/es";

@Pipe({
  name: "moment",
  standalone: true,
})
export class MomentPipe implements PipeTransform {
  transform(value: any, formato: string = "DD/MM/YYYY"): string {
    if (!value) return "";

    return moment(value).format(formato);
  }
}
