import { Pipe, PipeTransform } from '@angular/core';
import { followers } from '../interface/followers';

@Pipe({
  name: 'followers',
})
export class FollowersPipe implements PipeTransform {

  transform(followers: followers[], searchText: string) {
    if (!followers || searchText == '') {
      return followers;
    }
    const filtered: followers[] = [];
    for (let user of followers) {
      if (user.fullname.toLowerCase().includes(searchText.toLowerCase())) {
        filtered.push(user);
      }
    }
    return filtered;
  }
}
