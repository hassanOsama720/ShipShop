import { List, TextField,Button } from "@mui/material";
import Products_Card from "../../components/Products_Card";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import SortIcon from '@mui/icons-material/Sort';
import CategoryIcon from '@mui/icons-material/Category';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import {
  getCategoriesList,
  getProductsList,
  searchProduct,
  selectGategory,
  sortAscend,
  sortDescend,
  sortRating,
} from "../../redux/action/Products";
import {Container} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";



function Products() {
  const ProductsList = useSelector((state) => state.ProductsReducer.vlist);
  const FirstList = useSelector((state) => state.ProductsReducer.list);
  const CategoriesList = useSelector((state) => state.ProductsReducer.categories);
  const selected_category = useSelector((state) => state.ProductsReducer.category);
  //---------------------------------------------------------------------
  const [searchWord, setSearchWord] = useState("");
  const [sorting, setSorting] = useState("none");
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("Category");
  const [activeSort, setActiveSort] = useState("Sort");
  const [more, setMore] = useState(10);
  //----------------------------------------------------------------------
  const dispatch = useDispatch();
  //----------------------------------------------------------------------
  useEffect(() => {
    if (searchWord === ""&& sorting === "none") {
      dispatch(getProductsList(selected_category,more));
      dispatch(getCategoriesList());
    }  if(searchWord !== "" && sorting === "none") {
      dispatch(searchProduct(searchWord, selected_category,FirstList));
    }
    if(sorting !== "none"){
      if(sorting === "ascend"){
        dispatch(sortAscend(ProductsList))
      }
      if(sorting === "descend"){
        dispatch(sortDescend(ProductsList))
      }
      if(sorting === "rating"){
        dispatch(sortRating(ProductsList))
      }
    }
  }, [selected_category, searchWord,sorting,more]);
//-------------------------------------------------------------------------------------------
  function categoryClick(cat) {
    setSorting("none")
    dispatch(selectGategory(cat._id));
  }
  function searchHandel(e) {
    setSorting("none")
    setSearchWord(e.target.value);
  }
  function loadMore() {
    setMore((more+5));
   
  }

  const handleClickCategory = () => {
    setCategoryOpen(!categoryOpen);
  };
  const handleClickSort = () => {
    setSortOpen(!sortOpen);
  };
//----------------------------------------------------------------------------------------------
  return (
    <Container style={{padding:"0" ,position:"relative"}} fluid className="d-flex flex-column flex-wrap justify-content-end min-vh-100">
      <div className="products-bar">
   
      <List
          sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
          component="nav"
          aria-labelledby="nested-list-subheader">
          <ListItemButton onClick={handleClickCategory}>
            <ListItemIcon>
              <CategoryIcon />
            </ListItemIcon>
            <ListItemText primary={activeCategory} />
            {categoryOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse style={{backgroundColor:"white",boxShadow:"rgb(222 226 230 / 51%) 0px 20px 20px 4px"}} in={categoryOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
            <ListItemButton onClick={()=> {categoryClick({_id:""})
          setCategoryOpen(!categoryOpen)
          setActiveCategory("Category")
          setMore(10)}} sx={{ pl: 4 }}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="All" />
          </ListItemButton>
            {CategoriesList.map((cat) => {
          return (
            <ListItemButton onClick={()=> {categoryClick(cat)
            setCategoryOpen(!categoryOpen)
            setActiveCategory(cat.name)
            setMore(10)}} sx={{ pl: 4 }}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary={cat.name} />
          </ListItemButton>
          )
        })}
            </List>
          </Collapse>
        </List>
      
          
      
        <TextField
        style={{ width: "50%",marginTop:"10px" }}
        id="outlined-basic"
        label="Product Name"
        value={searchWord}
        variant="outlined"
        onChange={(e) => searchHandel(e)}
      />

        <List
          sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
          component="nav"
          aria-labelledby="nested-list-subheader">
          <ListItemButton onClick={handleClickSort}>
            <ListItemIcon>
              <SortIcon />
            </ListItemIcon>
            <ListItemText primary={activeSort} />
            {sortOpen ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse style={{backgroundColor:"white",boxShadow:"rgb(222 226 230 / 51%) 0px 20px 20px 4px"}} in={sortOpen} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton onClick={()=> {setSorting("none");
            setSortOpen(!sortOpen)
            setActiveSort("Sort")}} sx={{ pl: 4 }}>
                <ListItemIcon>
                  <StarBorder />
                </ListItemIcon>
                <ListItemText primary="None" />
              </ListItemButton>
              <ListItemButton onClick={()=> {setSorting("descend");
            setSortOpen(!sortOpen)
            setActiveSort("Descend (price)")}} sx={{ pl: 4 }}>
                <ListItemIcon>
                  <StarBorder />
                </ListItemIcon>
                <ListItemText primary="High to low Price" />
              </ListItemButton>
              <ListItemButton onClick={()=> {setSorting("ascend");
            setSortOpen(!sortOpen)
            setActiveSort("Ascend (price)")}} sx={{ pl: 4 }}>
                <ListItemIcon>
                  <StarBorder />
                </ListItemIcon>
                <ListItemText primary="Low to high price" />
              </ListItemButton>
              <ListItemButton onClick={()=> {setSorting("rating");
            setSortOpen(!sortOpen)
            setActiveSort("Descend (rating)")}} sx={{ pl: 4 }}>
                <ListItemIcon>
                  <StarBorder />
                </ListItemIcon>
                <ListItemText primary="High to low rating" />
              </ListItemButton>
            </List>
          </Collapse>
        </List>
        
      
      </div >
      
      <Container
      className="d-flex flex-wrap justify-content-around min-vh-100" style={{width:"100%",marginTop:"50px"}}>
      
      
      {ProductsList.map((product) => {
        return <Products_Card product={product}></Products_Card>;
      })}
      </Container>
      <Button
          className="product-info"
          style={{ width: "30%",margin:"auto",marginBottom:"30px" }}
          variant="outlined"
          onClick={loadMore}
        >
          Load More
        </Button>
    </Container>
  );
}

export default Products;
