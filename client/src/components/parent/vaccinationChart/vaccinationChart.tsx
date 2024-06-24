import { Table } from "react-bootstrap";
import { CommonFooter } from "../../common/footer/footer";
import { ParentNavbar } from "../parentNavbar/parentNavbar";

export const VaccinationChart = () => {
  return (
    <div>
      <ParentNavbar />
      <h3 className="text-center my-5">
        National Immunisation Schedule (NIS) for Infants, Children and Pregnant
        Women
      </h3>
      <div className="chart-container" style={{ minHeight: "560px" }}>
        <Table
          hover
          className="m-auto mt-5"
          bordered
          striped
          style={{ width: "90%" }}
        >
          <thead>
            <tr>
              <th>Vaccine</th>
              <th>When to give</th>
              <th>Dose</th>
              <th>Route</th>
              <th>Site</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={5} className="text-center mt-5">
                <b>For Pregnant Women</b>
              </td>
            </tr>
            <tr>
              <td>TT-1</td>
              <td>Early in pregnancy</td>
              <td>0.5 ml</td>
              <td>Intramuscular</td>
              <td>Upper Arm</td>
            </tr>
            <tr>
              <td>TT-2</td>
              <td>4 weeks after TT-1*</td>
              <td>0.5 ml</td>
              <td>Intramuscular</td>
              <td>Upper Arm</td>
            </tr>
            <tr>
              <td>TT- Booster</td>
              <td>
                If received 2 TT doses in a pregnancy within the last 3 yrs*
              </td>
              <td>0.5 ml</td>
              <td>Intramuscular</td>
              <td>Upper Arm</td>
            </tr>
            <tr>
              <td colSpan={5} className="text-center mt-5">
                <b>For Infants</b>
              </td>
            </tr>
            <tr>
              <td>BCG</td>
              <td>At birth or as early as possible till one year of age</td>
              <td>0.1ml (0.05ml until 1 month age)</td>
              <td>Intradermal</td>
              <td>Left Upper Arm</td>
            </tr>
            <tr>
              <td>Hepatitis B - Birth dose</td>
              <td>At birth or as early as possible within 24 hours</td>
              <td>0.5 ml</td>
              <td>Intramuscular</td>
              <td>Antero-lateral side of mid-thigh</td>
            </tr>
            <tr>
              <td>OPV-0</td>
              <td>At birth or as early as possible within the first 15 days</td>
              <td>2 drops</td>
              <td>Oral</td>
              <td>Oral</td>
            </tr>
            <tr>
              <td>OPV 1, 2 & 3</td>
              <td>
                At 6 weeks, 10 weeks & 14 weeks (OPV can be given till 5 years
                of age)
              </td>
              <td>2 drops</td>
              <td>Oral</td>
              <td>Oral</td>
            </tr>
            <tr>
              <td>Pentavalent1, 2 & 3</td>
              <td>
                At 6 weeks, 10 weeks & 14 weeks (can be given till one year of
                age)
              </td>
              <td>0.5 ml</td>
              <td>Intramuscular</td>
              <td>Antero-lateral side of mid-thigh</td>
            </tr>
            <tr>
              <td>Rotavirus#</td>
              <td>
                At 6 weeks, 10 weeks & 14 weeks (can be given till one year of
                age)
              </td>
              <td>5 drops</td>
              <td>Oral</td>
              <td>Oral</td>
            </tr>
            <tr>
              <td>IPV</td>
              <td>Two fractional dose at 6 and 14 weeks of age</td>
              <td>0.1 ml</td>
              <td>Intradermal</td>
              <td>Right upper arm</td>
            </tr>
            <tr>
              <td>Measles /MR 1st Dose$</td>
              <td>
                9 completed months-12 months (can be given till 5 years of age)
              </td>
              <td>0.5 ml</td>
              <td>Subcutaneous</td>
              <td>Right upper Arm</td>
            </tr>
            <tr>
              <td>JE - 1**</td>
              <td>9 completed months-12 months</td>
              <td>0.5 ml</td>
              <td>Subcutaneous</td>
              <td>Left upper Arm</td>
            </tr>
            <tr>
              <td>Vitamin A (1st dose)</td>
              <td>At 9 completed months with measles Rubella</td>
              <td>1 ml (1 lakh IU)</td>
              <td>Oral</td>
              <td>Oral</td>
            </tr>
            <tr>
            <td  colSpan={5} className="text-center mt-5">
                <b>For Children</b>
              </td>
            </tr>
            <tr>
              <td>DPT booster-1</td>
              <td>16-24 months</td>
              <td>0.5 ml</td>
              <td>Intramuscular</td>
              <td>Antero-lateral side of mid-thigh</td>
            </tr>
            <tr>
              <td>Measles/ MR 2nd dose $</td>
              <td>16-24 months</td>
              <td>0.5 ml</td>
              <td>Subcutaneous</td>
              <td>Right upper Arm</td>
            </tr>
            <tr>
              <td>OPV Booster</td>
              <td>16-24 months</td>
              <td>2 drops</td>
              <td>Oral</td>
              <td>Oral</td>
            </tr>
            <tr>
              <td>JE-2</td>
              <td>16-24 months</td>
              <td>0.5 ml</td>
              <td>Subcutaneous</td>
              <td>Left Upper Arm</td>
            </tr>
            <tr>
              <td>Vitamin A***</td>
              <td>
                (2nd to 9th dose) 16-18 months. Then one dose every 6 months up
                to the age of 5 years
              </td>
              <td>2 ml (2 lakh IU)</td>
              <td>Oral</td>
              <td>Oral</td>
            </tr>
            <tr>
              <td>DPT Booster-2</td>
              <td>5-6 years</td>
              <td>0.5 ml</td>
              <td>Intramuscular</td>
              <td>Upper Arm</td>
            </tr>
            <tr>
              <td>TT</td>
              <td>10 years & 16 years</td>
              <td>0.5 ml</td>
              <td>Intramuscular</td>
              <td>Upper Arm</td>
            </tr>
          </tbody>
        </Table>
      </div>
      <div className="mt-5">
      <CommonFooter />

      </div>
    </div>
  );
};
