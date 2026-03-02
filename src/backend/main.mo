import Array "mo:core/Array";
import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Time "mo:core/Time";
import Text "mo:core/Text";
import Order "mo:core/Order";
import Iter "mo:core/Iter";
import Runtime "mo:core/Runtime";

actor {
  // Data Types
  type BusRoute = {
    id : Nat;
    from : Text;
    to : Text;
    departureTime : Text;
    arrivalTime : Text;
    duration : Text;
    fare : Float;
  };

  type Feedback = {
    id : Nat;
    name : Text;
    phone : Text;
    rating : Nat;
    comment : Text;
    timestamp : Int;
  };

  module Feedback {
    public func compare(fb1 : Feedback, fb2 : Feedback) : Order.Order {
      Nat.compare(fb2.id, fb1.id); // Sort by newest first
    };
  };

  // Persistent Storage
  let routes = Map.empty<Nat, BusRoute>();
  let feedbacks = Map.empty<Nat, Feedback>();

  var feedbackIdCounter = 0;

  // Seed Bus Routes
  let initialRoutes : [BusRoute] = [
    {
      id = 1;
      from = "San Salvador";
      to = "Santa Ana";
      departureTime = "07:00 AM";
      arrivalTime = "09:30 AM";
      duration = "2h 30m";
      fare = 8.5;
    },
    {
      id = 2;
      from = "Santa Ana";
      to = "San Salvador";
      departureTime = "03:30 PM";
      arrivalTime = "06:00 PM";
      duration = "2h 30m";
      fare = 8.5;
    },
    {
      id = 3;
      from = "San Miguel";
      to = "Usulután";
      departureTime = "08:00 AM";
      arrivalTime = "09:00 AM";
      duration = "1h";
      fare = 4.0;
    },
    {
      id = 4;
      from = "La Libertad";
      to = "San Salvador";
      departureTime = "06:00 AM";
      arrivalTime = "07:15 AM";
      duration = "1h 15m";
      fare = 3.25;
    },
    {
      id = 5;
      from = "Santa Tecla";
      to = "Soyapango";
      departureTime = "02:45 PM";
      arrivalTime = "04:15 PM";
      duration = "1h 30m";
      fare = 5.75;
    },
    {
      id = 6;
      from = "Apopa";
      to = "Metapán";
      departureTime = "11:00 AM";
      arrivalTime = "03:15 PM";
      duration = "4h 15m";
      fare = 15.0;
    },
    {
      id = 7;
      from = "Acajutla";
      to = "San Vicente";
      departureTime = "05:30 AM";
      arrivalTime = "09:50 AM";
      duration = "4h 20m";
      fare = 19.00;
    },
    {
      id = 8;
      from = "Sonsonate";
      to = "La Unión";
      departureTime = "01:15 PM";
      arrivalTime = "05:45 PM";
      duration = "4h 30m";
      fare = 22.50;
    },
  ];

  // Initialize persistent storage with seed data
  system func preupgrade() {
    for (route in initialRoutes.values()) {
      routes.add(route.id, route);
    };
  };

  // Queries
  public query ({ caller }) func getAllRoutes() : async [BusRoute] {
    routes.values().toArray();
  };

  public query ({ caller }) func searchRoutes(from : Text, to : Text) : async [BusRoute] {
    let fromLower = from.toLower();
    let toLower = to.toLower();

    routes.values().toArray().filter(
      func(route) {
        route.from.toLower().contains(#text fromLower) and route.to.toLower().contains(#text toLower)
      }
    );
  };

  public query ({ caller }) func getAllFeedbacks() : async [Feedback] {
    feedbacks.values().toArray().sort();
  };

  // Mutations
  public shared ({ caller }) func submitFeedback(name : Text, phone : Text, rating : Nat, comment : Text) : async () {
    if (rating < 1 or rating > 5) {
      Runtime.trap("Rating must be between 1 and 5");
    };

    let newFeedback : Feedback = {
      id = feedbackIdCounter;
      name;
      phone;
      rating;
      comment;
      timestamp = Time.now();
    };

    feedbacks.add(feedbackIdCounter, newFeedback);
    feedbackIdCounter += 1;
  };
};
