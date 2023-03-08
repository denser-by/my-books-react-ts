select a.name, b.name from authors AS a, books AS b, author_book ab 
  where a.id = ab.author AND b.id = ab.book;

