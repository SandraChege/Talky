// describe('should create posts', () => {
//   beforeEach(() => {
//     cy.loginUser();
//   });

//   it('should create a new post', () => {
//     cy.visit('/home');
//     cy.contains('Create Post').click();

//     cy.get('[data-cy=addPostForm]').within(() => {
//       cy.get('[data-cy=content]').type('its yet another beautiful day');
//       // Add file to the post (assuming you have ngx-dropzone)
//       cy.fixture('test-image.jpg').then((fileContent) => {
//         cy.get('input[type="file"]').attachFile({
//           fileContent,
//           fileName: 'test-image.jpg',
//           mimeType: 'image/jpeg',
//         });
//       });
//       // Submit the form
//       cy.get('[data-cy=add_post_btn]').click();
//     });
//     cy.contains('its yet another beautiful day');
//   });

//   it('should add a comment to a post', () => {
//     cy.get('[data-cy=allPosts]').first().within(() => {
//         cy.contains('Reply').first().click();
//         cy.get('[data-cy=reply]').type('Good novel');
//         // Submit the comment
//         cy.get('.comment').click();
//       });
//     cy.contains('Good novel');
//   });

//   // Add more tests for other features as needed
// });
