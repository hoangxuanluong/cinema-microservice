import * as React from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'
import GitHubIcon from '@mui/icons-material/GitHub'
import FacebookIcon from '@mui/icons-material/Facebook'
import TwitterIcon from '@mui/icons-material/Twitter'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import post1 from '../utils/blog/blog-post.1.md'
import post2 from '../utils/blog/blog-post.1.md'
import post3 from '../utils/blog/blog-post.1.md'
import MainFeaturedPost from '../components/MainFeaturedPost'
import FeaturedPost from '../components/FeaturedPost'
import Footer from '../components/Footer'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import Main from '../components/Main'
import BuyTicket from './BuyTicket'
import axios from 'axios'

const sections = [
  { title: 'Change Point', url: '/change-point' },
  { title: 'Book Ticket', url: '#' },
  // { title: 'Culture', url: '#' },
  // { title: 'Business', url: '#' },
  // { title: 'Politics', url: '#' },
  // { title: 'Opinion', url: '#' },
  // { title: 'Science', url: '#' },
  // { title: 'Health', url: '#' },
  // { title: 'Style', url: '#' },
  // { title: 'Travel', url: '#' },
]

const mainFeaturedPost = {
  title: 'Forrest Gump',
  description:
    'A man with a low IQ accomplishes great things in his life and witnesses and influences various historical events.',
  image: 'https://source.unsplash.com/random?wallpapers',
  imageText: 'main image description',
  linkText: 'Continue reading…',
}

const featuredPosts = [
  {
    title: 'Featured post',
    date: 'Nov 12',
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content.',
    image: 'https://source.unsplash.com/random?wallpapers',
    imageLabel: 'Image Text',
  },
  {
    title: 'Post title',
    date: 'Nov 11',
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content.',
    image: 'https://source.unsplash.com/random?wallpapers',
    imageLabel: 'Image Text',
  },
]

const posts = [post1, post2, post3]

const sidebar = {
  title: 'About',
  description:
    'Etiam porta sem malesuada magna mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.',
  archives: [
    { title: 'March 2020', url: '#' },
    { title: 'February 2020', url: '#' },
    { title: 'January 2020', url: '#' },
    { title: 'November 1999', url: '#' },
    { title: 'October 1999', url: '#' },
    { title: 'September 1999', url: '#' },
    { title: 'August 1999', url: '#' },
    { title: 'July 1999', url: '#' },
    { title: 'June 1999', url: '#' },
    { title: 'May 1999', url: '#' },
    { title: 'April 1999', url: '#' },
  ],
  social: [
    { name: 'GitHub', icon: GitHubIcon },
    { name: 'Twitter', icon: TwitterIcon },
    { name: 'Facebook', icon: FacebookIcon },
  ],
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme()

export default function Home() {
  React.useEffect(() => {
    document.title = 'Trang chủ'
  }, [])

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Container maxWidth='lg'>
        <Header title='MMM Cinema' sections={sections} />
        <main>
          <MainFeaturedPost post={mainFeaturedPost} />
          <BuyTicket />
          {/* <Grid container spacing={4}>
            {featuredPosts.map((post) => (
              <FeaturedPost key={post.title} post={post} />
            ))}
          </Grid> */}
          {/* <Grid container spacing={5} sx={{ mt: 3 }}>
            <Main title='From the firehose' posts={posts} />
            <Sidebar
              title={sidebar.title}
              description={sidebar.description}
              archives={sidebar.archives}
              social={sidebar.social}
            />
          </Grid> */}
        </main>
      </Container>
      <Footer
        title='Footer'
        description='Something here to give the footer a purpose!'
      />
    </ThemeProvider>
  )
}
