--
-- PostgreSQL database dump
--

-- Dumped from database version 16.2
-- Dumped by pg_dump version 16.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: status_request; Type: TYPE; Schema: public; Owner: user
--

CREATE TYPE public.status_request AS ENUM (
    'onrequest',
    'disagree',
    'agree'
);


ALTER TYPE public.status_request OWNER TO "user";

--
-- Name: admin_id_seq; Type: SEQUENCE; Schema: public; Owner: user
--

CREATE SEQUENCE public.admin_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.admin_id_seq OWNER TO "user";

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: admin; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.admin (
    id integer DEFAULT nextval('public.admin_id_seq'::regclass) NOT NULL,
    username text,
    password text
);


ALTER TABLE public.admin OWNER TO "user";

--
-- Name: admin_id_seq_new; Type: SEQUENCE; Schema: public; Owner: user
--

CREATE SEQUENCE public.admin_id_seq_new
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.admin_id_seq_new OWNER TO "user";

--
-- Name: approver_id_seq; Type: SEQUENCE; Schema: public; Owner: user
--

CREATE SEQUENCE public.approver_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.approver_id_seq OWNER TO "user";

--
-- Name: approver; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.approver (
    id integer DEFAULT nextval('public.approver_id_seq'::regclass) NOT NULL,
    username text,
    password text,
    level integer
);


ALTER TABLE public.approver OWNER TO "user";

--
-- Name: driver_id_seq; Type: SEQUENCE; Schema: public; Owner: user
--

CREATE SEQUENCE public.driver_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.driver_id_seq OWNER TO "user";

--
-- Name: driver; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.driver (
    id integer DEFAULT nextval('public.driver_id_seq'::regclass) NOT NULL,
    name text
);


ALTER TABLE public.driver OWNER TO "user";

--
-- Name: request_id_seq; Type: SEQUENCE; Schema: public; Owner: user
--

CREATE SEQUENCE public.request_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.request_id_seq OWNER TO "user";

--
-- Name: request; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.request (
    id integer DEFAULT nextval('public.request_id_seq'::regclass) NOT NULL,
    id_driver integer,
    id_approver integer,
    id_vehicle integer,
    date_request date DEFAULT CURRENT_DATE,
    status public.status_request,
    id_admin integer
);


ALTER TABLE public.request OWNER TO "user";

--
-- Name: vehicle_id_seq; Type: SEQUENCE; Schema: public; Owner: user
--

CREATE SEQUENCE public.vehicle_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.vehicle_id_seq OWNER TO "user";

--
-- Name: vehicle; Type: TABLE; Schema: public; Owner: user
--

CREATE TABLE public.vehicle (
    id integer DEFAULT nextval('public.vehicle_id_seq'::regclass) NOT NULL,
    name text
);


ALTER TABLE public.vehicle OWNER TO "user";

--
-- Data for Name: admin; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public.admin (id, username, password) FROM stdin;
\.


--
-- Data for Name: approver; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public.approver (id, username, password, level) FROM stdin;
1	uhuy	password	1
2	uhuy	$2y$10$MAxxct.qUn6Ch2ldJ5dy.uBptfsX7U1zqRjKb2.fL0pvYkn6kOocO	1
3	uhuy	$2y$10$cXwfU5DczhNEnhbq2psUTOfVJMTaG792kpEh7CHZNprVQqVaotsDG	1
4	\N	$2y$10$mMvTN/a/GJZGmfOG/2RJTeF/CympJNbvM.ZKS7fv8k4/pai./xwFC	\N
5	uhuy	$2y$10$g5iZ72uzAnHx7ZmsQ2l.K.w.C9DdpasMwtIiSUxvFxAAJoXT/F7aS	\N
6	uhuy	$2y$10$I711HoewRt8PQr9QCByUsOMyYyqp.Sl4QNJbCiCn//2YkYXCRfQtG	\N
7	makan	$2y$10$6.oKcl9KeRPBUyrKLxUZi.aUnyHDL3DuFWA2mwN2JNJWUhtW/9PHO	\N
8	makan	$2y$10$mZ1g8DdCdm2lCukvl77KPuWctMSb.qY0vkAKl11Ommt.kPsoG.UG6	\N
9	makan	$2y$10$T0GvfZ/EXSBQojPSEXGAX.Y0K1WWW1jfbWhKxGq7Jj1.lv22YmkFa	\N
10	makan	$2y$10$Ut12GGOR1FjjvQ4WTSTHGuy4hDPRXisNScAjZbS8a0v/xPC/94cse	\N
11	makan	$2y$10$U431ZP0jb14UXLgdbs8kvuAdkslrJmsnRGgB23X0ZSTfyzLgaSE2S	\N
12	makan	$2y$10$UGVY2M7zFf9piYrkIkkjZeU.sAkfDvKMlakoMqETXG9oqeOgTMzBW	\N
13	sulthan	$2y$10$ZuIhpyOE34Pfc1N0TZgNs.Pm.8kMKZubNdtjY6ZwVd9f9sG2pOeiC	0
14	sulthan	$2y$10$poTf0vYs7aqZX2joFxYEnuDmCn0AACa6AeRKiy1/1v9t1R.X7Vdwq	0
15	sulthan	$2y$10$zr4cyzEAwNfs4eg.ivc6eehNrw7Eq9CK8u8qlcZ8S4s4/ocOCcdae	0
16	sulthan	$2y$10$KkRKB6ekaljSLyM5HsDYRuc7TCtG3ofqq5uzUjnzfGTe02n8cjV/.	\N
17	sulthan	$2y$10$U4L5YLKtnk49lcoM6CxJK.ZuNPmB2KE0.MilGj5H37MhV/tbUFrhS	\N
18	wdada	$2y$10$hJzcBPFE85omg4vj9BNvYOK1ei5O5uRkqWsv5QBzDzi2fQ85PXbry	1
\.


--
-- Data for Name: driver; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public.driver (id, name) FROM stdin;
1	uhuy
\.


--
-- Data for Name: request; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public.request (id, id_driver, id_approver, id_vehicle, date_request, status, id_admin) FROM stdin;
\.


--
-- Data for Name: vehicle; Type: TABLE DATA; Schema: public; Owner: user
--

COPY public.vehicle (id, name) FROM stdin;
1	bmw
\.


--
-- Name: admin_id_seq; Type: SEQUENCE SET; Schema: public; Owner: user
--

SELECT pg_catalog.setval('public.admin_id_seq', 1, false);


--
-- Name: admin_id_seq_new; Type: SEQUENCE SET; Schema: public; Owner: user
--

SELECT pg_catalog.setval('public.admin_id_seq_new', 1, false);


--
-- Name: approver_id_seq; Type: SEQUENCE SET; Schema: public; Owner: user
--

SELECT pg_catalog.setval('public.approver_id_seq', 18, true);


--
-- Name: driver_id_seq; Type: SEQUENCE SET; Schema: public; Owner: user
--

SELECT pg_catalog.setval('public.driver_id_seq', 1, true);


--
-- Name: request_id_seq; Type: SEQUENCE SET; Schema: public; Owner: user
--

SELECT pg_catalog.setval('public.request_id_seq', 1, false);


--
-- Name: vehicle_id_seq; Type: SEQUENCE SET; Schema: public; Owner: user
--

SELECT pg_catalog.setval('public.vehicle_id_seq', 1, true);


--
-- Name: admin admin_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.admin
    ADD CONSTRAINT admin_pkey PRIMARY KEY (id);


--
-- Name: approver approver_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.approver
    ADD CONSTRAINT approver_pkey PRIMARY KEY (id);


--
-- Name: driver driver_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.driver
    ADD CONSTRAINT driver_pkey PRIMARY KEY (id);


--
-- Name: request request_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.request
    ADD CONSTRAINT request_pkey PRIMARY KEY (id);


--
-- Name: vehicle vehicle_pkey; Type: CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.vehicle
    ADD CONSTRAINT vehicle_pkey PRIMARY KEY (id);


--
-- Name: request request_id_admin_fkey; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.request
    ADD CONSTRAINT request_id_admin_fkey FOREIGN KEY (id_admin) REFERENCES public.admin(id);


--
-- Name: request request_id_approver_fkey; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.request
    ADD CONSTRAINT request_id_approver_fkey FOREIGN KEY (id_approver) REFERENCES public.approver(id);


--
-- Name: request request_id_driver_fkey; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.request
    ADD CONSTRAINT request_id_driver_fkey FOREIGN KEY (id_driver) REFERENCES public.driver(id);


--
-- Name: request request_id_vehicle_fkey; Type: FK CONSTRAINT; Schema: public; Owner: user
--

ALTER TABLE ONLY public.request
    ADD CONSTRAINT request_id_vehicle_fkey FOREIGN KEY (id_vehicle) REFERENCES public.vehicle(id);


--
-- PostgreSQL database dump complete
--

