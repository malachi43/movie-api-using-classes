//A Movie Renting API.
class MovieStore {
    static movies = [
        { genre: "action", movieTitle: "carter", desc: "A man wakes up missing his memories. Directed by a mysterious voice from a device in his ear, he sets off on a hostage rescue mission rife with danger.", rating: 5.1, id: 1, rentPrice: 50 },
        { genre: "comedy", movieTitle: "family switch", desc: "When family memebers switch bodies with each other during rare planetary alignment, their hilarious joureny to  find their way back to normal will bring them closer together than they ever thought possible.", rating: 5.6, id: 2, rentPrice: 50 },
        { genre: "horror", movieTitle: "fear the waklking dead", desc: "The lives of the residents of Los Angeles turn upside down when a zombie apocalypse occurs. A dysfunctional family has to reinvent itself and adapt to new ways of surviving disaster", rating: 6.8, id: 3, rentPrice: 50 },
        { genre: "drama", movieTitle: "every day", desc: "Rhiannon, a teenage girl, falls in love with a spirit that possesses a different person's body each day. Soon, their lives change drastically when faced with a difficult decision", rating: 6.4, id: 4, rentPrice: 50 }
    ]
    static lateFee = 12
    static borrowWindow = 3
    isLoggedIn = false
    static genre = ["action", "comedy", "horror", "drama"]
    static customers = []

    constructor(username, password) {
        this.username = username
        this.password = password
    }

    login(username, password) {
        if (this.username == username && this.password == password) {
            console.log(`You successfully logged in.`)
            this.isLoggedIn = true
            return
        }
        // console.log(`invalid credentials`)
        this.isLoggedIn = false
    }

    logout() {
        this.username = undefined
        this.password = undefined
        this.isLoggedIn = false
        console.log(`You successfully logged out.`)
    }

    //you can see list of movies without logging in.
    static listMovies() {
        console.log(`AVAILABLE MOVIES:\n`, MovieStore.movies)
    }

    calcLateFee(id) {
        for (let movie of MovieStore.movies) {
            if (movie.id === id) {
                return `#${movie.rentPrice * MovieStore.lateFee}`
            }
        }
    }

    searchByGenre(genre) {
        //check if user is logged in.
        if (this.isLoggedIn) {
            for (let movie of MovieStore.movies) {
                if (movie.genre === genre) {
                    movie.movieTitle = movie.movieTitle.toUpperCase()
                    movie.genre = movie.genre.toUpperCase()
                    console.log(`${genre.toUpperCase()}:\n`, movie)
                    return
                }
            }
            console.log(`No search result for genre:(${genre.toUpperCase()}) found.`)
        } else {
            console.log(`You must be logged in.`)
        }

    }
    rentMovie(id) {
        //check if user is logged in.
        if (this.isLoggedIn) {

            let rentDetails = {}
            for (let movie of MovieStore.movies) {
                if (movie.id === id) {

                    let now = new Date()
                    rentDetails["movieId"] = movie.id
                    rentDetails["movieTitle"] = movie.movieTitle.toUpperCase()
                    rentDetails["rentPrice"] = `#${movie.rentPrice}`
                    rentDetails['dateborrowed'] = new Date().toDateString()
                    rentDetails["dueDateToReturn"] = new Date(now.setDate(now.getDate() + MovieStore.borrowWindow)).toDateString()
                    rentDetails['feeToPayAfterDueDate'] = this.calcLateFee(movie.id)
                    movie['returnDate'] = rentDetails["dueDateToReturn"]

                    console.log('RENT DETAILS:\n', rentDetails)
                    MovieStore.customers.push(this.username)
                    console.log(`customer(s) who have rented a movie: `, MovieStore.customers)

                    rentDetails = null
                    return
                }

            }

            console.log(`No movie with this id:(${id}).`)
        }
        else {
            console.log(`You must be logged in.`)
        }

    }

    returnMovie() {
        MovieStore.customers = MovieStore.customers.filter((customer, index) => {
            if (this.username !== customer) {
                return true
            }
            return false
        })
        console.log(`cutomer(s) yet to return rented movie: `, MovieStore.customers)
    }

    static uploadMovie({ genre, movieTitle, rentPrice, rating, desc, id }) {
        MovieStore.movies.push({ genre, movieTitle, rentPrice, rating, desc, id })
    }
}


const user = new MovieStore("Malachi", 12345)
MovieStore.listMovies()
//You must login to access other methods aside listmovies()
user.login("Malachi", 12345)
console.log()
user.searchByGenre('drama')
console.log()
user.rentMovie(4)
console.log()
user.returnMovie()
console.log()
MovieStore.uploadMovie({ genre: "comedy", desc: "Two teenagers are on a quest to frustrate their father because he is a loafer.", rentPrice: 550, movieTitle: "Aki and Pawpaw", rating: 8.6, id: 5 })
console.log()
MovieStore.listMovies()
console.log()
user.logout()
console.log()