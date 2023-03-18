import BookImage1 from '../images/1.jpg';
import BookImage2 from '../images/2.jpg';
import BookImage3 from '../images/3.jpg';
import BookImage4 from '../images/4.jpg';
import BookImage5 from '../images/5.jpg';
import BookImage6 from '../images/6.jpg';
import BookImage7 from '../images/7.jpg';
import BookImage8 from '../images/8.jpg';
import BookImage9 from '../images/9.jpg';
import BookImage10 from '../images/10.jpg';
import BookImage11 from '../images/11.jpg';
import BookImage12 from '../images/12.jpg';
import BookImage13 from '../images/13.jpg';
import BookImage14 from '../images/14.jpg';
import BookImage15 from '../images/15.jpg';
import BookImage16 from '../images/16.jpg';
import BookImage17 from '../images/17.jpg';
import BookImage18 from '../images/18.jpg';
import BookImage19 from '../images/19.jpg';
import BookImage20 from '../images/20.jpg';
import AuthorImage1 from '../images/author1.gif';
import AuthorImage2 from '../images/author2.gif';
import AuthorImage3 from '../images/author3.gif';

export function getImageBook(book) {
    if (book.cover_img_data != null && book.cover_img_data.length > 20)
        return book.cover_img_data;
    else if (book.cover_img_path != null && book.cover_img_path.length > 0) {
        if (book.cover_img_path.indexOf('/1.jpg') > -1) return BookImage1;
        if (book.cover_img_path.indexOf('/2.jpg') > -1) return BookImage2;
        if (book.cover_img_path.indexOf('/3.jpg') > -1) return BookImage3;
        if (book.cover_img_path.indexOf('/4.jpg') > -1) return BookImage4;
        if (book.cover_img_path.indexOf('/5.jpg') > -1) return BookImage5;
        if (book.cover_img_path.indexOf('/6.jpg') > -1) return BookImage6;
        if (book.cover_img_path.indexOf('/7.jpg') > -1) return BookImage7;
        if (book.cover_img_path.indexOf('/8.jpg') > -1) return BookImage8;
        if (book.cover_img_path.indexOf('/9.jpg') > -1) return BookImage9;
        if (book.cover_img_path.indexOf('/10.jpg') > -1) return BookImage10;
        if (book.cover_img_path.indexOf('/11.jpg') > -1) return BookImage11;
        if (book.cover_img_path.indexOf('/12.jpg') > -1) return BookImage12;
        if (book.cover_img_path.indexOf('/13.jpg') > -1) return BookImage13;
        if (book.cover_img_path.indexOf('/14.jpg') > -1) return BookImage14;
        if (book.cover_img_path.indexOf('/15.jpg') > -1) return BookImage15;
        if (book.cover_img_path.indexOf('/16.jpg') > -1) return BookImage16;
        if (book.cover_img_path.indexOf('/17.jpg') > -1) return BookImage17;
        if (book.cover_img_path.indexOf('/18.jpg') > -1) return BookImage18;
        if (book.cover_img_path.indexOf('/19.jpg') > -1) return BookImage19;
        if (book.cover_img_path.indexOf('/20.jpg') > -1) return BookImage20;
    }
}

export function getImageAuthor(author) {
    if (author.photo_data != null && author.photo_data.length > 20)
        return author.photo_data;
    else if (author.photo_path != null && author.photo_path.length > 0) {
        if (author.photo_path.indexOf('/author1.gif') > -1) return AuthorImage1;
        if (author.photo_path.indexOf('/author2.gif') > -1) return AuthorImage2;
        if (author.photo_path.indexOf('/author3.gif') > -1) return AuthorImage3;
    }
}