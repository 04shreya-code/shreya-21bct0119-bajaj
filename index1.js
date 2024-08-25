// api/bfhl.js
export default async (req, res) => {
    if (req.method === 'GET') {
      res.status(200).json({ operation_code: 1 });
    } else if (req.method === 'POST') {
      const { data } = req.body;
  
      const user_id = "shreya_s_04122003"; // Replace with your actual user_id
      const email = "shreya.s2021@vitstudent.ac.in";
      const roll_number = "21BCT0119";
  
      let numbers = [];
      let alphabets = [];
      let highest_lowercase_alphabet = '';
  
      data.forEach(item => {
        if (!isNaN(item)) {
          numbers.push(item);
        } else {
          alphabets.push(item);
          if (item === item.toLowerCase() && item > highest_lowercase_alphabet) {
            highest_lowercase_alphabet = item;
          }
        }
      });
  
      res.status(200).json({
        is_success: true,
        user_id,
        email,
        roll_number,
        numbers,
        alphabets,
        highest_lowercase_alphabet: highest_lowercase_alphabet ? [highest_lowercase_alphabet] : []
      });
    } else {
      res.status(405).json({ error: 'Method Not Allowed' });
    }
  };
  