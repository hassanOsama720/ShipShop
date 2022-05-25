import React from "react";
import { NavLink } from "react-router-dom";

const FAQs = () => {
  return (
    <>
      <div className="content py-4">
        <div className="faq-header">
          <h1>
            Frequently Asked Questions <i className="far fa-question-circle"></i>
          </h1>
          <hr />
        </div>
        <h3>
          <i className="far fa-question-circle"></i> Most Common Questions{" "}
        </h3>
        <hr />
        <div>
          <input
            type="checkbox"
            id="question1"
            name="q"
            className="questions"
          />
          <div className="plus">+</div>
          <label htmlFor="question1" className="question">
            How is quality ensured?{" "}
          </label>
          <div className="answers">
            <p>
              For each task we select corresponding Clickworkers according to
              their individual skills. These skills have been verified through
              trainings and tests. Furthermore, their skills are continuously
              subjected to evaluation based on the work results. In addition,
              the high quality of the work results are secured by special
              quality management measures such as statistic process control,
              audits, peer reviews and evaluation.{" "}
            </p>
          </div>
        </div>
        <div>
          <input
            type="checkbox"
            id="question2"
            name="q"
            className="questions"
          />
          <div className="plus">+</div>
          <label htmlFor="question2" className="question">
            Where do you deliver?
          </label>
          <div className="answers">
            <p>
              We can ship and deliver umbrellas all across the Egypt. We can
              deliver our umbrellas all around the Egypt. Our distribution
              warehouses are located in Egypt, Africa. We've also got stockists
              and dealers in regions across these countries and in regional hubs
              such as the UAE. We'll look to get your product to you as soon as
              possible.
            </p>
          </div>
        </div>
        <div>
          <input
            type="checkbox"
            id="question3"
            name="q"
            className="questions"
          />
          <div className="plus">+</div>
          <label htmlFor="question3" className="question">
            When will my order be shipped?
          </label>
          <div className="answers">
            <p>
              We know you're excited about your new purchase. For standard stock
              orders, we strive to have these dispatched within 48 hours of your
              order being placed and paid for. While you wait we'll send you
              information on how you can prep for your new umbrella. For custom
              products made to order, your lead time will be advised by your
              consultant. If you have not received a lead time from your
              consultant{" "}
            </p>
          </div>
        </div>
        <div>
          <input
            type="checkbox"
            id="question4"
            name="q"
            className="questions"
          />
          <div className="plus">+</div>
          <label htmlFor="question4" className="question">
            How can I place orders?
          </label>
          <div className="answers">
            <p>
              There are two ways to place orders for our services: By using the
              Self-Service Marketplace (only for text creation, surveys and
              sentiment analysis) or by placing an individual order and personal
              contact (managed service) to our sales team{" "}
            </p>
          </div>
        </div>
        <div>
          <input
            type="checkbox"
            id="question5"
            name="q"
            className="questions"
          />
          <div className="plus">+</div>
          <label htmlFor="question5" className="question">
            What is the charge for processing?
          </label>
          <div className="answers">
            <p>
              We offer free processing on all orders over E£100. On orders less
              than E£100 the cost of barcodes and marc records is E£10.00 per
              order.{" "}
            </p>
          </div>
        </div>
        <div>
          <input
            type="checkbox"
            id="question6"
            name="q"
            className="questions"
          />
          <div className="plus">+</div>
          <label htmlFor="question6" className="question">
            Which method of ordering is best for me?
          </label>
          <div className="answers">
            <p>
              In the areas of standardized text creation (with and without
              keywords), survey tasks and sentiment analysis, it is more
              advantageous and favorable for you to enter the order using the
              Self-Service Marketplace. If you have large, individual projects
              from any service areas offered, please contact our sales team.
              They will provide personal advice and discuss the project with you{" "}
            </p>
          </div>
        </div>
        <hr />

        <h3>
          <i className="far fa-question-circle"></i> PURCHASE, ORDERING, & RETURNS
        </h3>
        <hr />

        {/* <div>
          <input
            type="checkbox"
            id="question11"
            name="q"
            className="questions"
          />
          <div className="plus">+</div>
          <label htmlFor="question11" className="question">
            What is the "S&L" price?
          </label>
          <div className="answers">
            <p>
              S&L means school/library/hosipital. Our school/library prices reflect a 30%
              discount off list prices.
            </p>
          </div>
        </div> */}
        <div>
          <input
            type="checkbox"
            id="question12"
            name="q"
            className="questions"
          />
          <div className="plus">+</div>
          <label htmlFor="question12" className="question">
            How do I order Cavendish Square Materials?
          </label>
          <div className="answers">
            <p>
              You can order shipShop  Products by mail, toll-free fax or
              telephone, and online through our cart or quick order portals.
            </p>
            <p>
              By mail, please submit your order form (from a catalog, brochure,
              or PDF) or purchase order to:
            </p>
            <p>
              shipshop 
              <br />
              243 5th Mansoura, suezcanel st 136
              <br />
              Mansoura, NY 35111
              <br />
              Attention: Customer Service
            </p>
            <p>
              Place an order anytime through our toll-free fax at
              01554293937. Please fax the order form or purchase order; be
              sure to include the billing and shipping addresses, item ISBNs,
              titles, quantity, price, shipping/handling, and tax (if
              applicable). Please include any special instructions or library
              processing requests.
            </p>
            <p>
              Please feel free to order toll-free via telephone between 9 AM and
              5 PM, Eastern Standard Time, Monday through Friday at
              01554293937.
            </p>
            <p>
              To order online, please select items for your cart and proceed to
              Checkout, or you can input ISBNs directly to create a quick order
              here.
            </p>
          </div>
        </div>
        <div>
          <input
            type="checkbox"
            id="question13"
            name="q"
            className="questions"
          />
          <div className="plus">+</div>
          <label htmlFor="question13" className="question">
            How do I redeem coupons/discounts/online purchase bonuses?
          </label>
          <div className="answers">
            <p>
              Cavendish Square is happy to redeem all coupons, price-reduction
              offers, online purchase bonuses, and special discounts. Please
              include any coupons or offers with mailed or faxed orders.
            </p>
            <p>
              When placing your online order please follow instructions for
              coupon and bonus redemption. For any price-reduction offers and
              special discounts, please include these details within the comment
              section of the purchase portal.
            </p>
            <p>
              You can also contact Customer Service at 01554293937 between 9
              AM and 5 PM, EST, Monday through Friday to redeem offers.
            </p>
          </div>
        </div>
        <div>
          <input
            type="checkbox"
            id="question14"
            name="q"
            className="questions"
          />
          <div className="plus">+</div>
          <label htmlFor="question14" className="question">
            How long will it take for me to receive my order once it has been
            placed?
          </label>
          <div className="answers">
            <p>
              Our standard shipping time is 7 to 10 business days from the
              receipt of your purchase order for in-stock items. If your order
              requires expedited delivery, please call Customer Service at
              01554293937.{" "}
            </p>
          </div>
        </div>
        <div>
          <input
            type="checkbox"
            id="question15"
            name="q"
            className="questions"
          />
          <div className="plus">+</div>
          <label htmlFor="question15" className="question">
            What happens when an item is Out of Stock? Does that mean it will be
            backordered?
          </label>
          <div className="answers">
            <p>
              Cavendish Square does its very best to keep everything in stock.
              If a product is temporarily out of stock, it will be backordered
              automatically and shipped immediately upon availability.
            </p>

            <p>
              {" "}
              At the time of placing your order (either via phone, fax, or
              online), please specify how you would wish to process backorders
              if they occur.{" "}
            </p>
            <ul>
            <p>
              Selections include:
              <br />
              
                <li>
                  Billing at the time of order processing or billing when the
                  backordered item(s) ship
                </li>
                <li>
                  Canceling an order if backorder status occurs, or creating a
                  termination date when an order should be canceled if items
                  still remain on backorder status on that date
                </li>
              </p>
              </ul>
          </div>
        </div>
        <div>
          <input
            type="checkbox"
            id="question16"
            name="q"
            className="questions"
          />
          <div className="plus">+</div>
          <label htmlFor="question16" className="question">
            What is your return policy?
          </label>
          <div className="answers">
            <p>
              Our products are satisfaction guaranteed. If you are not
              completely satisfied with your purchase, please contact Customer
              Service within 30 days of delivery and we will gladly replace your
              products or credit your account.
              <br />
              We will accept returns on any material that is found to be
              unsatisfactory including improperly processed books, however,
              properly process books cannot be returned. Products must be
              returned within 60 days of purchase and must be accompanied by a
              copy of the invoice.{" "}
            </p>
          </div>
        </div>
        <hr />

        <h3>
          <i className="far fa-question-circle"></i> TAX &amp; SHIPPING
        </h3>
        <hr />

        <div>
          <input
            type="checkbox"
            id="question17"
            name="q"
            className="questions"
          />
          <div className="plus">+</div>
          <label htmlFor="question17" className="question">
            Do you charge sales tax?
          </label>
          <div className="answers">
            <p>We only apply taxes for states where applicable. </p>
          </div>
        </div>
        <div>
          <input
            type="checkbox"
            id="question18"
            name="q"
            className="questions"
          />
          <div className="plus">+</div>
          <label htmlFor="question18" className="question">
            What is the cost for shipping & handling?
          </label>
          <div className="answers">
            <p>Shipping is FREE on all orders over E£350. </p>
            <p>
              On orders less than E£350, shipping is 9% of your invoice total.{" "}
            </p>
            <p>
              Additional shipping charges will be applied to all orders that are
              outside of the United States.{" "}
            </p>
          </div>
        </div>
        <hr />

        <h3>
          <i className="far fa-question-circle"></i> CUSTOMER SERVICE
        </h3>
        <hr />

        <div>
          <input
            type="checkbox"
            id="question24"
            name="q"
            className="questions"
          />
          <div className="plus">+</div>
          <label htmlFor="question24" className="question">
            What are your customer services?
          </label>
          <div className="answers">
            <p>
              Our Customer Service Representatives are outstanding individuals
              who understand the importance of knowing you. Cavendish Square
              customer services are varied and flexible, depending upon your
              specific needs. If you need to view a sample or find out more
              about our books, collections, or other products in order to make
              an informed purchase, we’re ready to serve you.
            </p>
            <p>
              Our Customer Service Representatives are available from 9 AM to 5
              PM EST at 01554293937. <br />
              ShipShop Mansoura
              <br />
              243 5th SuezCanelSt, 136
              <br />
              Mansoura, SuezCanelSt 
              <br />
              Customer Service <br />
              Toll-free: 01554293937
              <br />
              Toll-free fax: 01554293937
              <br />
              Customer Service Form{" "}
            </p>
          </div>
        </div>
        <div>
          <input
            type="checkbox"
            id="question25"
            name="q"
            className="questions"
          />
          <div className="plus">+</div>
          <label htmlFor="question25" className="question">
            May I submit a question for FAQ?
          </label>
          <div className="answers">
            We would like your Cavendish Square experience to be as
            user-friendly as possible, please feel free to submit a FAQ for
            inclusion in this section.
          </div>
        </div>
        <hr />

        <h3>
          <i className="far fa-question-circle"></i> USING THIS WEBSITE
        </h3>
        <hr />

        <div>
          <input
            type="checkbox"
            id="question26"
            name="q"
            className="questions"
          />
          <div className="plus">+</div>
          <label htmlFor="question26" className="question">
            What are the benefits of registering for an online user account?
          </label>
          <div className="answers">
            <p>
              We know that your time is very valuable. As a registered user, the
              time you spend browsing our site and learning about our products
              can be saved in your Wish List, and you can create multiple Wish
              Lists for future visits. You can also save carts for impending
              purchases. You can customize the information that you’d like to
              receive from Cavendish Square regarding your areas of interest.{" "}
            </p>
            <p>
              Another advantage of being an online user is that you become
              eligible for exclusive discounts and generous offers from
              Cavendish Square.
            </p>
            <p>Register Me Today!</p>
          </div>
        </div>
        <div>
          <input
            type="checkbox"
            id="question27"
            name="q"
            className="questions"
          />
          <div className="plus">+</div>
          <label htmlFor="question27" className="question">
            What if I lose my username/password or I cannot log into my account?
          </label>
          <div className="answers">
            <p>
              If you have entered the correct username/password and you’re still
              unable to log in, please call Customer Service at 01554293937.
              We will also remind you of your username and password in case you
              forget. Otherwise, you can reset your password through our reset
              portal.{" "}
            </p>
          </div>
        </div>
        <div>
          <input
            type="checkbox"
            id="question28"
            name="q"
            className="questions"
          />
          <div className="plus">+</div>
          <label htmlFor="question28" className="question">
            Who do I contact with feedback regarding this site?
          </label>
          <div className="answers">
            <p>
              All comments are welcome. Please submit your feedback,
              suggestions, or comments here.  To read our privacy policy, please
              click here.{" "}
            </p>
          </div>
          <hr />

          <h3>
            <i className="far fa-question-circle"></i> DOMESTIC &amp; INTERNATIONAL
            SALES
          </h3>
          <hr />

          <div>
            <input
              type="checkbox"
              id="question20"
              name="q"
              className="questions"
            />
            <div className="plus">+</div>
            <label htmlFor="question20" className="question">
              How can I find my local sales representative?
            </label>
            <div className="answers">
              <p>
                Our Representatives—who are experts in making sure that your
                acquisition needs are met—can be located by calling Customer
                Service at 01554293937.{" "}
              </p>
            </div>
          </div>
          <div>
            <input
              type="checkbox"
              id="question21"
              name="q"
              className="questions"
            />
            <div className="plus">+</div>
            <label htmlFor="question21" className="question">
              How do I purchase books if I live outside of the United States?
            </label>
            <div className="answers">
              <p>
                Customer Service can help you directly with international
                purchases. Additional shipping charges will be added for
                international delivery. Please call Customer Service at
                01554293937.{" "}
              </p>
            </div>
          </div>
          <div>
            <input
              type="checkbox"
              id="question22"
              name="q"
              className="questions"
            />
            <div className="plus">+</div>
            <label htmlFor="question22" className="question">
              Do you have distributors outside of the Egypt?
            </label>
            <div className="answers">
              <p>
                Really, WE don't have any distributors out of Egypt,
                Maybe in the Future Who Know !
              </p>
            </div>
          </div>
          <div>
            <input
              type="checkbox"
              id="question23"
              name="q"
              className="questions"
            />
            <div className="plus">+</div>
            <label htmlFor="question23" className="question">
              How can I obtain a copy of your catalogs and brochures?
            </label>
            <div className="answers">
              <p>
                We produce several catalogs and brochures, covering our full
                line across all divisions. To download any brochures and
                catalogs in PDF form, or to request delivery of any of our
                current materials, please click here.{" "}
              </p>
            </div>
          </div>
          <hr />

          <h3>
            <i className="far fa-question-circle"></i> RIGHTS &amp; USAGE
          </h3>
          <hr />

          <div>
            <input
              type="checkbox"
              id="question19"
              name="q"
              className="questions"
            />
            <div className="plus">+</div>
            <label htmlFor="question19" className="question">
              How do I inquire about reproduction, translation, electronic
              publishing, or subsidiary rights?
            </label>
            <div className="answers">
              <p>
                Permissible usage varies per product. Many of our books are
                available for translation, subsidiary rights licensing, and
                usage other than original purposes.
              </p>
              <p>
                You can verify usage rights through Customer Service at 01554293937 or
                by submitting your query through our Customer Service form.
              </p>
              <p>
                When contacting us, please have the title/product name and ISBN
                that you’re inquiring about, along with a description of how you
                would like to use/reproduce the materials.
              </p>
              <p>
                Attn: Permissions Department
                <br />
                243 5th Mansoura, SuezCanelSt 136
                <br />
                Egypt, NY 10016
              </p>
            </div>
          </div>
          <hr />
          <div className="text-center">
            <h3>
              IF you Have any Other Question You Can Contact Us From Here !
              <NavLink
                to="/contact"
                className="btn btn-outline-dark  ms-2 px-3 py-2"
              >
                Contact Us
              </NavLink>
            </h3>
          </div>
        </div>
      </div>
    </>
  );
};

export default FAQs;
