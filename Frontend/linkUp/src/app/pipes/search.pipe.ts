import { Pipe, PipeTransform } from '@angular/core';
import { getAllUsers } from '../interface/user';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  transform( allUsers: getAllUsers[], searchText: string) {

    if (!allUsers || searchText == '') {
      return allUsers;
    }
    const filtered: getAllUsers[] = [];
    for (let user of allUsers) {
      if (user.fullname.toLowerCase().includes(searchText.toLowerCase())) {
        filtered.push(user);
      }
    }
    return filtered;
  }
}
