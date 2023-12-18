import { Pipe, PipeTransform } from '@angular/core';
import { following } from '../interface/followers';

@Pipe({
  name: 'followings',
})
export class FollowingsPipe implements PipeTransform {

  transform(following: following[], searchText: string) {
    if (!following || searchText == '') {
      return following;
    }
    const filtered: following[] = [];
    for (let user of following) {
      if (user.fullname.toLowerCase().includes(searchText.toLowerCase())) {
        filtered.push(user);
      }
    }
    return filtered;
  }
}
